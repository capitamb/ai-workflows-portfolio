# 04 — Subscription Cohort Analysis Demo

A Claude-scaffolded cohort retention analysis on synthetic subscription data, designed to demonstrate two things at once: (1) how AI scaffolds an analytical pipeline end-to-end, and (2) how to catch the AI when its first-pass conclusion is wrong.

The dataset is constructed so the headline answer to "is retention getting worse?" is **misleading** — aggregate retention declines across cohorts while every country's retention is stable. The notebook walks through the first-pass AI answer, the verification step that surfaces the inconsistency, and the corrected analysis that identifies the real driver as a **mix shift in acquisition**, not a retention behavior change. This is a textbook **Simpson's paradox**, and it is the single most common failure mode in cohort-level reporting.

## Why this demo exists

The other three workflows in this portfolio are systems built and used over time. This one extends the same patterns into a new analytical domain — turning a business question into a finished output, fast, with AI as the scaffolding layer and human judgment as the verification layer.

The point is not the cohort analysis itself. The point is to show the **process**: how to use AI to ship faster *and* avoid shipping the wrong answer.

## Files

| File | What it is |
|------|------------|
| [`analysis.ipynb`](./analysis.ipynb) | Jupyter notebook with the full analysis: setup, AI-scaffolded first pass, verification step, decomposition, and exec memo. Outputs are pre-embedded for direct viewing on GitHub. |
| [`exec-memo.md`](./exec-memo.md) | The standalone five-bullet executive memo — the format a Head of Pro reads in 90 seconds. |
| [`data/generate_data.js`](./data/generate_data.js) | Reproducible synthetic data generator (seeded RNG). Constructs the dataset with stable per-country retention and a deliberate mix shift across cohorts. |
| [`data/synthetic-subscriptions.csv`](./data/synthetic-subscriptions.csv) | The generated dataset: ~50,860 user-month observations across 10,000 users, 12 cohorts, 3 countries, 2 plan tiers, 4 channels. |

## How to read this demo

Open the notebook on GitHub (renders directly) or in a Jupyter / Colab environment. The narrative is the point:

1. **Setup** — load the dataset, understand its shape.
2. **Step 1 — First pass with AI scaffolding.** The AI produces an aggregate cohort retention table and reads a clear "retention is declining" trend.
3. **Step 2 — Verification habit.** Three skeptical questions: is the trend consistent within segments? Has the segment mix changed? Are sample sizes adequate? The first two reveal the issue.
4. **Step 3 — Decomposition.** Quantify how much of the aggregate "decline" is mix-shift vs. residual retention change. Answer: essentially all of it is mix-shift.
5. **Step 4 — Catching this kind of error.** Five habits that prevent shipping the wrong conclusion.
6. **Executive Memo.** Five bullets, what changed, what to do.

## Reproducing the dataset

```bash
cd data
node generate_data.js
```

The generator uses a fixed seed (42), so the same dataset is produced on every run. Edit the parameter block at the top of `generate_data.js` to change cohort counts, country mix dynamics, or per-country retention rates.

## What this demonstrates for a hiring conversation

- **AI as scaffolding layer**, not as final authority — Claude produces the first pass; the human verifies before shipping.
- **The verification habit is the differentiator** — catching Simpson's paradox is the difference between an analyst who reads the data and one who reads only what the AI tells them.
- **Decomposition over rhetoric** — quantify how much of an observed trend is composition vs. behavior. Recommendation follows from the decomposition.
- **Memo over deck** — the deliverable is five bullets a leader reads in 90 seconds, not a 12-slide presentation.
