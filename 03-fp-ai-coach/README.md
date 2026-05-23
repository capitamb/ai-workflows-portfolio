# 03 — FP&A AI Coach

A custom sub-agent for structured practice and skill development in financial planning & analysis, with a bias toward automation (Python, SQL, Power BI). Built to replace passive learning with active reps under coaching.

## The problem

Most "learn FP&A" content is lecture-shaped: read this, watch this, study this. The actual skill — driver-based forecasting, variance decomposition, building a model that does not collapse on the second iteration, communicating a finding in five bullets — is built only through practice with feedback. Generic AI assistance is too patient and too quick to give answers; it does not push back.

What was needed: a coach-shaped agent that diagnoses what the user is actually trying to build, puts them in a problem, and corrects in real time.

## The system

The agent operates with four hard rules:

1. **Diagnose first, then teach.** Identify which skill the user is trying to build before answering. Ambiguous request → one clarifying question.
2. **Practice over lecture.** Minimum vocabulary, then a problem. The skill is built in the reps, not the explanation.
3. **Calibrated confidence.** "Several ways to model this" when true. Never invent definitive answers to sound authoritative.
4. **Show, don't just tell.** A Python script or SQL query is the answer when it would communicate better than three paragraphs.

Practice domains covered:

| Domain | Examples |
|--------|----------|
| Forecasting | Driver-based revenue, headcount-driven OPEX, working-capital schedules, scenario branches |
| Variance analysis | BvA bridges, EBITDA walk, price/volume/mix decomposition |
| Modeling structure | 3-statement linking, scenario toggles, audit trails, error checks |
| Automation | Pandas for monthly reporting, SQL for KPI extraction, DAX patterns |
| Communication | Compressing 40 hours of analysis into a 5-bullet memo |

## How AI is the operating layer

The agent is a Claude sub-agent with a restricted toolset (Read, Write, Edit, Grep, Glob, Bash, WebSearch, WebFetch). It uses these tools to:

- Generate synthetic datasets when a problem needs data — and explicitly tell the user the data is synthetic.
- Write actual Python scripts and SQL queries inside the session rather than describing them in prose.
- Reference the user's existing wiki pages (when invoked inside the Second Brain) to ground problems in the user's real career context.
- Maintain a "hint hierarchy" so the user can ask for progressively more help without jumping straight to the worked solution.

## Why this is a workflow, not just a prompt

A one-off prompt would give a one-off explanation. This agent is invocable, has a defined description that triggers it on the right kinds of questions, has restricted tools to keep it focused, and returns outputs in a defined structure (Setup → Constraints → Expected output → Hint hierarchy → Reference solution).

That structure is the difference between asking an AI a question and using an AI as a system. The structure is what makes practice compound across sessions instead of resetting every time.

## What is in this folder

- `agent-spec.md` — the full sub-agent specification: identity, operating rules, practice domains, response format, what not to do.

## Connection to the rest of the portfolio

This agent was originally built to close interview-prep gaps surfaced by a previous technical assessment. It is the most direct example of *using AI to scaffold one's own learning* — the same pattern that applies to scaffolding any analytical task: evaluation pass, synthesis pass, remediation pass.
