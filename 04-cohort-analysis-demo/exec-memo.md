# Cohort Retention "Decline" Is a Mix-Shift Artifact, Not a Retention Problem

**To:** Head of Pro
**From:** Carlos Meneses, Analytics
**Re:** Month-3 retention trend across acquisition cohorts (Jun 2025 – Feb 2026)
**TL;DR:** The headline decline is real in the aggregate, but it is not a retention behavior change — it is a mix-shift in acquisition. Action sits with acquisition strategy, not with retention experience.

---

- **Aggregate month-3 retention dropped from 69.4% (Jun-25 cohort) to 65.9% (Feb-26 cohort)** — a ~3.5pp decline across eight cohorts.

- **Within every country, retention is stable.** Country A ~79%, Country B ~50%, Country C ~68% — flat across all observable cohorts. No country shows degradation.

- **The aggregate decline is fully explained by a mix shift in acquisition.** Country A fell from 69% to 49% of new users; Country B (which structurally retains worse, ~50% vs. ~79%) grew from 21% to 41%. Country C share stable.

- **Recommended action is an acquisition-strategy decision, not a retention investigation.** Is the shift toward Country B intentional (growth into a larger market) or unintentional (paid-channel cost differential)? The answer determines whether to accept the new aggregate baseline or rebalance acquisition.

- **Recommend rebuilding the headline retention metric on a mix-adjusted basis going forward**, so future cohorts are comparable on retention behavior rather than on retention × acquisition mix.

---

*Analysis and verification steps in [`analysis.ipynb`](./analysis.ipynb). Synthetic dataset details in [`data/generate_data.js`](./data/generate_data.js).*
