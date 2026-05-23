# AI Workflows Portfolio

A working portfolio of personal AI workflows I use daily — built around Claude, focused on the kind of analytical and operational work I do as an early-career economist and finance analyst.

I am Carlos Meneses Barrios. I am an economist with background in M&A financial due diligence at KPMG Colombia and finance at The Coca-Cola Company. For the last several months, AI has been the operating system of my work — not a tool I open occasionally, but the layer I scaffold every analytical task with: cohort breakdowns, executive memos, recurring reports, and personal-knowledge synthesis. This repo documents the workflows I have actually built and the habits I use to keep AI honest.

The goal is not to show off prompts. It is to show **how I design reusable systems with AI as the operating layer, and how I catch AI when it is wrong.**

> **Note on the timeline.** Workflows 01–03 have been in active personal use for several months — the Second Brain since April 2026, the quantitative analysis agent since April 2026, the FP&A coach since May 2026. Workflow 04 is built specifically to demonstrate how the same patterns extend to a new analytical domain. The repository was published as a single commit because this is its first public release, but the work behind it is months in the making.

---

## The Workflows

| # | Workflow | What it demonstrates |
|---|----------|----------------------|
| [01](./01-second-brain-system/) | **Second Brain — Personal Knowledge System** | Schema design, ingest-to-synthesis pipeline, cross-linked structure that compounds over time |
| [02](./02-quantitative-analysis-agent/) | **Quantitative Pre-Event Analysis Agent** | Reusable custom agent, statistical rigor (EV, Kelly sizing), automated outcome verification, calibration feedback loop |
| [03](./03-fp-ai-coach/) | **FP&A AI Coach** | AI-assisted learning workflow: evaluation → scaffolding → targeted remediation |
| [04](./04-cohort-analysis-demo/) | **Subscription Cohort Analysis Demo** | AI-scaffolded cohort breakdown on synthetic data, with explicit error-catching |

Each subfolder has its own README with the problem, the system design, how AI is the operating layer, and (for workflows that ship) how outcomes are verified.

---

## How I Catch AI Errors

The single most important habit when working with AI on analytical tasks. None of this is theoretical — these are the actual checks I run.

1. **Never trust a number AI produces without an independent tie-out.** Recompute it from the source data or cross-check against a second source. If a number changes the conclusion, it gets verified before it ships.
2. **Watch for fabricated joins.** AI will confidently connect two datasets on a "key" that does not actually mean the same thing on both sides. Read every join and ask: is this the same entity here as it is there?
3. **Distrust confident-but-broken logic.** Fluency is not correctness. I audit the reasoning, not the tone. If the explanation flows beautifully but the conclusion does not match what the data should say, the explanation is the problem.
4. **Build verification into the workflow, not bolted on.** Workflow 02 auto-verifies every prediction against independent external sources after the event. The principle generalizes: design the verification loop *with* the system, not after.
5. **Triangulate sources.** Critical inputs (a number, a fact, a status) should come from at least two independent sources. When sources disagree, report the discrepancy — do not silently pick one.

This habit was built at KPMG during financial due diligence: the first question on any dataset is *where does this break, and what happens downstream when it does?* That training transfers directly to working with AI, where the failure modes are different but the discipline is the same.

---

## About me

- Economist (Universidad Católica de Colombia, Honors)
- Ex-KPMG Colombia, Transaction Services (M&A) — 11 months
- Ex-Coca-Cola, Finance Franchise Intern — 6 months
- Bilingual: Spanish (native) · English (professional working)
- LinkedIn: [linkedin.com/in/carlos-meneses-barrios](https://www.linkedin.com/in/carlos-meneses-barrios)
- Email: c.meneses10@outlook.com
