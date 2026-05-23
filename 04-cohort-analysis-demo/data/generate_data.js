// Synthetic subscription dataset generator
// Creates ~10k users distributed across 12 monthly cohorts (Jun 2025 - May 2026),
// with three countries whose mix shifts over time. Per-country retention is held
// roughly constant — the aggregate retention curve declines purely because of
// the mix shift (the Simpson's paradox illustrated in the notebook).
//
// Run with: node generate_data.js
// Output: synthetic-subscriptions.csv (long format, one row per user-month observation)

const fs = require('fs');
const path = require('path');

// Seeded RNG (Mulberry32) for reproducibility
let seed = 42;
function random() {
  seed = (seed + 0x6D2B79F5) | 0;
  let t = seed;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function weightedChoice(arr, weights) {
  const r = random();
  let cum = 0;
  for (let i = 0; i < arr.length; i++) {
    cum += weights[i];
    if (r < cum) return arr[i];
  }
  return arr[arr.length - 1];
}

// ---- Parameters ----
const COUNTRIES = ['Country A', 'Country B', 'Country C'];
const PLAN_TIERS = ['Basic', 'Premium'];
const CHANNELS = ['Organic', 'Paid', 'Referral', 'Partnership'];

// Country mix interpolates from start (oldest cohort) to end (newest cohort)
// Country A: 70% -> 40% (mature market, shrinking share)
// Country B: 20% -> 50% (emerging market, growing share)
// Country C: 10% -> 10% (stable share)
const country_mix_start = [0.70, 0.20, 0.10];
const country_mix_end   = [0.40, 0.50, 0.10];

// Per-country monthly retention probability (stable across cohorts)
// Country A retains best; Country B retains worst.
// Month-N retention ~ monthly_rate^N
const country_monthly_retention = {
  'Country A': 0.91,
  'Country B': 0.79,
  'Country C': 0.87,
};

const plan_retention_multiplier = { 'Basic': 1.00, 'Premium': 1.05 };
const plan_weights = [0.70, 0.30];
const channel_weights = [0.40, 0.30, 0.20, 0.10];

const cohort_months = [
  '2025-06','2025-07','2025-08','2025-09','2025-10','2025-11',
  '2025-12','2026-01','2026-02','2026-03','2026-04','2026-05'
];
const N_COHORTS = 12;
const REFERENCE_IDX = 11;  // reference month is the newest cohort
const users_per_cohort = [700, 720, 750, 780, 810, 830, 860, 880, 900, 930, 940, 900];

// ---- Generate ----
const records = [];
let user_id = 1;

for (let c = 0; c < N_COHORTS; c++) {
  const n = users_per_cohort[c];

  // Linear interpolation of country mix
  const t = c / (N_COHORTS - 1);
  const country_probs_raw = country_mix_start.map((s, i) => s + t * (country_mix_end[i] - s));
  const sum = country_probs_raw.reduce((a, b) => a + b, 0);
  const country_probs = country_probs_raw.map(p => p / sum);

  // How many post-acquisition months are observable for this cohort
  const observable = Math.min(REFERENCE_IDX - c, 6);

  for (let i = 0; i < n; i++) {
    const country = weightedChoice(COUNTRIES, country_probs);
    const plan_tier = weightedChoice(PLAN_TIERS, plan_weights);
    const channel = weightedChoice(CHANNELS, channel_weights);

    let monthly_p = country_monthly_retention[country] * plan_retention_multiplier[plan_tier];
    if (monthly_p > 0.98) monthly_p = 0.98;

    let retained = true;
    for (let m = 0; m <= observable; m++) {
      if (m > 0 && retained) {
        retained = random() < monthly_p;
      }
      records.push({
        user_id, cohort_month: cohort_months[c], country, plan_tier, channel,
        months_since_acquisition: m, is_retained: m === 0 ? true : retained
      });
    }
    user_id++;
  }
}

// ---- Write CSV ----
const headers = ['user_id','cohort_month','country','plan_tier','channel','months_since_acquisition','is_retained'];
const lines = [headers.join(',')];
for (const r of records) {
  lines.push([r.user_id, r.cohort_month, r.country, r.plan_tier, r.channel,
              r.months_since_acquisition, r.is_retained ? 'True' : 'False'].join(','));
}

const outPath = path.join(__dirname, 'synthetic-subscriptions.csv');
fs.writeFileSync(outPath, lines.join('\n'));
console.log(`Generated ${records.length} rows for ${user_id - 1} users`);
console.log(`Saved: ${outPath}`);

// ---- Sanity check: month-3 retention by cohort (aggregate and by country) ----
const month3 = records.filter(r => r.months_since_acquisition === 3);

const aggByCohort = {};
for (const r of month3) {
  if (!aggByCohort[r.cohort_month]) aggByCohort[r.cohort_month] = { n: 0, retained: 0 };
  aggByCohort[r.cohort_month].n++;
  if (r.is_retained) aggByCohort[r.cohort_month].retained++;
}
console.log('\nAggregate month-3 retention by cohort:');
for (const c of cohort_months) {
  if (aggByCohort[c]) {
    const rate = aggByCohort[c].retained / aggByCohort[c].n;
    console.log(`  ${c}: ${(rate * 100).toFixed(1)}% (n=${aggByCohort[c].n})`);
  }
}

const byCC = {};
for (const r of month3) {
  const k = r.cohort_month + '|' + r.country;
  if (!byCC[k]) byCC[k] = { n: 0, retained: 0 };
  byCC[k].n++;
  if (r.is_retained) byCC[k].retained++;
}
console.log('\nMonth-3 retention by cohort × country:');
console.log('  cohort   | Country A         | Country B         | Country C');
for (const c of cohort_months) {
  if (aggByCohort[c]) {
    const cells = COUNTRIES.map(country => {
      const k = c + '|' + country;
      if (byCC[k] && byCC[k].n > 0) {
        return `${(byCC[k].retained / byCC[k].n * 100).toFixed(1)}% (n=${byCC[k].n.toString().padStart(3)})`;
      }
      return 'n/a            ';
    });
    console.log(`  ${c}  | ${cells[0]} | ${cells[1]} | ${cells[2]}`);
  }
}
