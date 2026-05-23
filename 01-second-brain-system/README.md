# 01 — Second Brain: Personal Knowledge System

A structured personal knowledge base where every source (article, book, video, document, conversation) is ingested, synthesized, and filed into a cross-linked wiki with a defined schema, an index, and an append-only operation log. Built on Obsidian as the local filesystem and Claude as the synthesis layer.

## The problem

Information from many sources stays scattered. Articles get half-read, books get summarized once and forgotten, conversations produce insights that never reach the next decision. A note-taking app does not solve this — it just spreads the scatter across more pages.

What was needed: a system where every new input strengthens a structured whole, every concept connects to the goals it serves, and AI does the synthesis so the human stays in the loop only for judgment.

## The system

```
Second Brain/
├── CLAUDE.md              ← schema: page types, conventions, workflows
├── wiki/
│   ├── index.md           ← catalog, updated on every operation
│   ├── log.md             ← append-only timeline of all operations
│   ├── overview.md        ← evolving big-picture synthesis
│   ├── goals/             ← one page per goal
│   ├── sources/           ← one page per source (article, book, video)
│   ├── concepts/          ← reusable frameworks and mental models
│   ├── interview-prep/    ← role-specific preparation
│   └── people/            ← people who influence the thinking
└── raw/                   ← original source files, never modified
```

See `CLAUDE.md` in this folder for the full schema definition.

## How AI is the operating layer

AI does not assist the system — it operates it:

1. **Ingest.** A new source (PDF, video, conversation) goes into `raw/`. Claude reads it fully, synthesizes the key ideas, and writes a structured source page following the schema.
2. **Connect.** Claude updates relevant goal pages with the source under Resources, and creates or updates concept pages for any new frameworks introduced.
3. **Synthesize.** Claude updates `overview.md` if the source shifts the big picture.
4. **Catalog.** Claude updates `index.md` and appends to `log.md` on every operation.

The human supplies the source and the judgment about what is worth filing. Claude supplies the structure, the synthesis, and the consistency enforcement.

## Why it compounds

Two design choices make this system valuable over time, not just at a single point:

- **The schema is enforced on every operation.** Page types are predictable; cross-links follow conventions. New entries make existing entries more findable, not less.
- **Every operation is logged.** The log is append-only and dated. The system has a memory of its own evolution, not just a snapshot.

## What is in this folder

- `CLAUDE.md` — the schema definition: page formats, naming conventions, workflows for ingest / query / lint / goal review.
- `agents/` — sample sub-agent specifications that operate against the vault.
- `examples/` — a sanitized source-page example showing the schema in practice.

The vault itself is private (it holds personal career strategy and reflection). The schema, the agents, and the workflow patterns are documented here.
