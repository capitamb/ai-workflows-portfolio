---
type: source
kind: article
created: 2026-05-22
source_url: https://www.anthropic.com/engineering/building-effective-agents
---

# Building Effective Agents

**Author/Speaker:** Anthropic Engineering
**Kind:** Article

## Summary

Anthropic's canonical post on when and how to build agentic systems. The central distinction: **workflows** are systems where LLMs and tools are orchestrated through predefined code paths, while **agents** are systems where LLMs dynamically direct their own processes and tool use. Workflows are more predictable, agents are more flexible. Most production AI use cases are workflows, not agents.

The post catalogs five canonical patterns: prompt chaining, routing, parallelization, orchestrator-workers, and evaluator-optimizer. Each is illustrated with a concrete example and a "when to use it" rule.

The key practical advice: **start simple, add complexity only when measurable improvement justifies it.** Most teams over-engineer; the right baseline is a single LLM call with good prompts and retrieval. Move to workflows when the task has clear, separable subtasks. Move to agents only when the task is genuinely open-ended.

## Key takeaways

- Workflow ≠ agent. The distinction is whether the LLM controls the flow.
- The five patterns are composable — most real systems are workflows that use multiple patterns.
- Tool design matters as much as prompt design. Good tools are self-documenting, hard to misuse, and produce useful errors.
- For agents specifically: clear stop conditions, observable state, and the ability for a human to inspect each step.
- Most failure modes are addressable with better prompting, retrieval, or workflow design — not by adding more agents.

## Connections

- [[experimentation-rigor]] — same skepticism toward "more sophisticated = better".
- [[rappi-ai-portfolio-plan]] — informs how the showcased workflows are described.
- [[fp-ai-coach]] — the agent itself follows the "single specialized agent, restricted tools" pattern from the post.

## Quotes worth keeping

> "Agents can be used for open-ended problems where it's difficult or impossible to predict the required number of steps."

> "When building applications with LLMs, we recommend finding the simplest solution possible, and only increasing complexity when needed."
