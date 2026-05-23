# 04 — Subscription Cohort Analysis Demo (in progress)

A Claude-scaffolded cohort analysis on synthetic subscription data, showing how the workflow patterns documented in this portfolio apply to a marketplace / subscription-program analytics context: cohort breakdown of subscribers, retention curves by acquisition channel and country, identification of segment-level dynamics hidden in the headline number, and an executive memo summarizing the finding in five bullets.

**Status: scaffolded, in progress.** The dataset and notebook will be added shortly.

## What this demo will show

- A synthetic dataset of subscribers modeled on a marketplace / subscription program (cohort by acquisition month, plan tier, country, channel).
- A Jupyter notebook where Claude scaffolds the cohort retention analysis end-to-end.
- An explicit "AI error catching" section showing where the AI's first draft of the analysis was wrong — and how it was caught.
- A 5-bullet executive memo as the final deliverable.

## Why this demo exists

The other three workflows in this portfolio are systems built and used over time. This one extends the same patterns into a new analytical domain — turning an analytical question into a finished output, fast, with AI as the scaffolding layer and human judgment as the verification layer.

The point is not the cohort analysis itself. The point is to show the **process**: how the same approach works against any structured business dataset.

## Files (coming)

- `data/synthetic-subscriptions.csv` — synthetic dataset, ~10k subscribers, ~12 months
- `analysis.ipynb` — the notebook with Claude scaffold + verification annotations
- `exec-memo.md` — the 5-bullet output
