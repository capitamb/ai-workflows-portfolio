# 02 — Quantitative Pre-Event Analysis Agent

A custom sub-agent that runs pre-event quantitative analysis on structured sports data, applies a defined statistical framework, sizes positions using a fractional-Kelly criterion against a tracked bankroll, registers every decision, and **automatically verifies outcomes** against independent external sources to recalibrate the model over time.

This is the most complete workflow in the portfolio because it has all the layers a real production analytics system needs: a methodology, a decision protocol, an outcome registry, an auto-verification loop, and a calibration feedback path.

## The problem

A decision-maker working with fragmented public data, no central registry of decisions, and no feedback loop has no way to tell whether their estimates are getting better. Each decision is made in isolation, the outcome is observed once, and the lesson never makes it back into the next estimate. That is the gap a real analytical system has to close.

## The system

The agent operates in two modes:

### Analysis mode (single event)
1. Pull structured pre-event data from verified sources, triangulating where critical.
2. Apply a six-section analytical framework: statistical base, tactical matchup, contextual factors, market context, historical patterns, edge evaluation.
3. Report where the data suggests possible market inefficiencies — **without** crossing into recommendation. The user owns the decision.

### Collaborative mode (combined ticket / multi-leg)
1. Read the bankroll file (`bankroll.md`) to get current balance, fractional-Kelly factor, and per-ticket cap.
2. Generate candidate legs from the event pool using the analysis-mode framework.
3. Score each candidate for edge, sample-size reliability, and correlation with other candidates.
4. Apply a hard cap (6 legs by default) and force-discard the lowest-edge candidates beyond it.
5. Estimate the combined EV honestly — report negative EV when that is the case.
6. Calculate stake using fractional Kelly, bounded by the per-ticket cap.
7. **Register the ticket automatically** with frontmatter capturing estimated probability, EV, stake, and bankroll snapshot.

## How AI is the operating layer

The agent is a custom Claude sub-agent (see `agent-spec.md` for the full spec). The Claude layer is doing four things at once:

1. **Multi-source data ingestion** — pulling from the verified sources directory, deciding which source is authoritative when they disagree, and reporting the disagreement explicitly.
2. **Framework application** — running the six-section analysis consistently across every event, so outputs are comparable over time.
3. **Decision scaffolding** — proposing candidates, scoring them, and presenting the trade-offs of the final ticket.
4. **Registry and bankroll synchronization** — writing the ticket file, updating the bankroll, and appending the history entry — all in a single operation.

## The verification layer (the most important part)

The system is built around the principle that **a prediction without a verification step is worthless** — you cannot improve what you do not measure.

After every event, the agent:
1. Globs the registered tickets directory for entries with `estado: pendiente` whose event date has passed.
2. Queries independent external sources (Flashscore, ESPN, official competition sites) for the actual outcome.
3. Marks each leg as ✅, ❌, or push.
4. Updates the ticket's frontmatter with the realized outcome.
5. Updates `bankroll.md` with the realized P&L.
6. If two sources disagree on a result, marks the ticket `requires_manual_review` instead of silently picking one.

This is the calibration loop. Over time, the registered history allows answering:
- Is "high-signal" actually closing more often than "medium-signal"?
- Is the model's estimated probability systematically optimistic by some margin?
- Which markets / leagues / conditions have the best ROI?

The answers feed back into the next ticket's confidence and sizing.

## Why this is the centerpiece

Five things together make this the strongest example of building a real analytical workflow:

1. **Reusable agent** — same protocol applied to every event, not bespoke per-event analysis.
2. **Statistical rigor** — expected value, Kelly sizing, sample-size discipline, explicit reporting of negative-EV outcomes.
3. **End-to-end ownership** — methodology, decision protocol, registry, verification, calibration — all in one system.
4. **Automated recurring workflow** — the verification step runs automatically against the pending tickets, no manual prompting.
5. **Designed-in error catching** — multi-source triangulation, explicit disagreement reporting, no silent picks.

## What is in this folder

- `agent-spec.md` — the full sub-agent specification: YAML frontmatter, identity, operating protocol, six-section analytical framework, collaborative-mode build process, error-catching rules.
- `architecture.md` — diagram and walkthrough of the calibration feedback loop.

## Domain note

The implementation domain is professional sports / football. The framework (EV, Kelly sizing, calibration loops, source triangulation) is general — the same architecture applies to any structured pre-event prediction problem with eventually-observable outcomes. I built this in the sports domain because it gives fast feedback cycles and abundant public structured data, which makes it the right sandbox for learning to design a real analytical-decision system end-to-end.
