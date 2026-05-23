# Architecture — Calibration Feedback Loop

The system is designed around one principle: **a prediction without a verification step is worthless.** Every architectural choice serves making the loop from estimate to outcome to recalibration as tight as possible.

## High-level diagram

```
                  ┌───────────────────────────┐
                  │   1. INPUT                │
                  │   Event pool, user goal,  │
                  │   bankroll state          │
                  └─────────────┬─────────────┘
                                │
                                ▼
                  ┌───────────────────────────┐
                  │   2. DATA GATHERING       │
                  │   Multi-source ingestion  │
                  │   with triangulation      │
                  └─────────────┬─────────────┘
                                │
                                ▼
                  ┌───────────────────────────┐
                  │   3. ANALYSIS             │
                  │   6-section framework     │
                  │   per event               │
                  └─────────────┬─────────────┘
                                │
                                ▼
                  ┌───────────────────────────┐
                  │   4. DECISION SCAFFOLD    │
                  │   Candidate generation,   │
                  │   correlation check,      │
                  │   EV estimate, Kelly      │
                  │   stake calculation       │
                  └─────────────┬─────────────┘
                                │
                                ▼
                  ┌───────────────────────────┐
                  │   5. REGISTRY             │
                  │   Write ticket file with  │
                  │   estimated probability,  │
                  │   EV, stake, bankroll     │
                  │   snapshot, leg detail    │
                  └─────────────┬─────────────┘
                                │
                                ▼
                       ── EVENT OCCURS ──
                                │
                                ▼
                  ┌───────────────────────────┐
                  │   6. AUTO-VERIFICATION    │
                  │   Query external sources, │
                  │   triangulate result,     │
                  │   mark each leg,          │
                  │   compute realized P&L    │
                  └─────────────┬─────────────┘
                                │
                                ▼
                  ┌───────────────────────────┐
                  │   7. BANKROLL UPDATE      │
                  │   Update saldo_actual,    │
                  │   append history entry,   │
                  │   refresh metadata        │
                  └─────────────┬─────────────┘
                                │
                                ▼
                  ┌───────────────────────────┐
                  │   8. CALIBRATION          │
                  │   Aggregate registry:     │
                  │   hit rate by signal,     │
                  │   ROI by market/league,   │
                  │   prob_estimated vs       │
                  │   realized frequency.     │
                  │   Detect systematic bias. │
                  └─────────────┬─────────────┘
                                │
                                ▼
              (Bias adjustment feeds back into step 4
               for the next ticket — the loop closes.)
```

## What each step is responsible for

### 1. Input
The user provides the event pool (league, weekend, specific matches) and a goal (single analysis or collaborative ticket build). The bankroll state is read from `bankroll.md` — never trusted from memory.

### 2. Data gathering
For every critical input (injury, line, money %), at least two of the verified sources must agree. When they disagree, the agent reports the disagreement explicitly — it never silently picks one source. This is the first place where AI failure modes are caught: a single hallucinated injury status is filtered out at this layer.

### 3. Analysis
The six-section framework is applied identically to every event so outputs are comparable. Sections: statistical base (xG, xGA, npxG, xPTS, PPDA), tactical matchup, contextual factors (rest, travel, weather, referee), market context (line movement, money vs. bet %), historical patterns (H2H, stadium), edge evaluation (where the data suggests market inefficiency).

### 4. Decision scaffold
Candidates are generated from the event pool's analyses. Each candidate is scored for individual edge, sample-size reliability, and correlation with other candidates. Negative correlation between legs is automatically excluded; positive correlation is flagged and accounted for in the combined-EV estimate. A hard cap on the number of legs forces discarding the weakest candidates — the discard table is included in the output for transparency.

### 5. Registry
Every ticket is written as a markdown file with rich frontmatter: estimated probability, EV, stake percentage, stake in units, stake in currency, Kelly fraction applied, correlation type, bankroll-at-creation, status. The file body contains the leg table, the per-leg reasoning, the correlation note, the identified risks, and the discard table.

### 6. Auto-verification
The agent globs the registry for tickets with `estado: pendiente` whose dates have passed. For each, it queries external sources for the actual outcome of each leg. Multi-source triangulation: if two sources disagree, the ticket is marked `requires_manual_review` instead of being force-resolved.

### 7. Bankroll update
On verification, `bankroll.md` is updated with the realized P&L, a history entry is appended (`YYYY-MM-DD — NEW_BALANCE CURRENCY (+/− X, descriptor)`), and metadata is refreshed.

### 8. Calibration
With enough registered tickets, the system can answer:
- **Hit rate by signal strength** — are "high-signal" legs actually closing more than "medium-signal" ones?
- **Probability calibration** — does the estimated probability match realized frequency, or is there systematic bias?
- **ROI by market and league** — where is the framework actually working?

When a bias is detected (e.g., high-signal BTTS legs have failed 60% of the last 10 tickets), the agent flags it the next time those legs are proposed, and adjusts the confidence weighting accordingly.

## Why the loop matters

Without verification and calibration, every ticket is an independent guess. With them, the system gets measurably better over time — which is the whole point of building an analytical system instead of just thinking harder. The architecture is built so the loop runs automatically and the only thing the human does is make the final decision.
