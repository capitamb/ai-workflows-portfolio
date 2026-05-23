# Second Brain — Schema

Configuration file that defines how the vault works, what the conventions are, and what to do in every operation. This file lives at the root of the vault and is read by Claude on every session.

## Purpose

The vault is a working memory for goals, learning, ideas, and decisions. It is designed so that every new entry strengthens the existing structure rather than just adding noise.

---

## Directory Structure

```
Second Brain/
├── CLAUDE.md              ← this file: schema and instructions
├── wiki/
│   ├── index.md           ← catalog of every wiki page (update on every change)
│   ├── log.md             ← append-only timeline of all operations
│   ├── overview.md        ← evolving big-picture synthesis
│   ├── goals/             ← one page per goal, linked to sub-goals, resources, concepts
│   ├── sources/           ← summaries of articles, books, podcasts, courses
│   ├── concepts/          ← frameworks, mental models, ideas worth developing
│   ├── interview-prep/    ← company-specific interview preparation
│   └── people/            ← people who influence the owner's thinking
└── raw/                   ← source documents, immutable — Claude reads but never modifies
```

---

## Page Formats

### Goal page (`wiki/goals/*.md`)
```markdown
---
type: goal
status: active | achieved | paused | dropped
parent: [[parent-goal]]
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# Goal Name

One-sentence description of what achieving this looks like.

## Why it matters
How this goal connects to the north star.

## Sub-goals
- [[sub-goal-1]]

## Current focus
What is being actively worked on right now.

## Resources
- [[source-page]] — how it is relevant

## Progress log
- **YYYY-MM-DD** — what happened, what changed
```

### Source page (`wiki/sources/*.md`)
```markdown
---
type: source
kind: article | book | podcast | course | video | personal-note
created: YYYY-MM-DD
source_url: https://...
---

# Title

**Author/Speaker:** Name
**Kind:** article | book | podcast | course | video

## Summary
2–4 paragraph summary of the key ideas.

## Key takeaways
- Takeaway one
- Takeaway two

## Connections
- [[concept-page]] — how this source informs it
- [[goal-page]] — how this source helps achieve it
```

### Concept page (`wiki/concepts/*.md`)
```markdown
---
type: concept
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# Concept Name

One-sentence definition.

## Core idea
Why it matters.

## How to apply it
Practical application.

## Related concepts
- [[related-concept]]
```

---

## Workflows

### On every operation
After any operation that creates or modifies wiki pages, always:
1. Update `wiki/index.md` to reflect new or changed pages.
2. Append an entry to `wiki/log.md`.

### Ingest a new source
1. Read the source fully.
2. Create a source summary page in `wiki/sources/` (kebab-case filename).
3. Update or create goal pages the source is relevant to.
4. Update or create concept pages for new frameworks introduced.
5. Update `wiki/overview.md` if the source shifts the big picture.
6. Update `wiki/index.md` and append to `wiki/log.md`.

Log format:
```
## [YYYY-MM-DD] ingest | Source Title
Brief note on what was added and what it touched.
```

### Query
When a question is asked:
1. Read `wiki/index.md` to identify relevant pages.
2. Synthesize an answer with citations to wiki pages (e.g., `[[page-name]]`).
3. If the answer is substantial, offer to file it as a new wiki page.

Log format:
```
## [YYYY-MM-DD] query | Question summary
One-line note on what was asked and what was produced.
```

### Lint (health check)
1. Read all pages via `wiki/index.md`.
2. Check for: contradictions, stale claims, orphan pages, missing cross-references, goals without recent progress.
3. Report findings, fix approved issues, log the lint pass.

---

## Conventions

- File names: **kebab-case** (e.g., `financial-freedom.md`).
- Internal links: Obsidian wiki-link format (`[[page-name]]`).
- Dates: ISO 8601 (`YYYY-MM-DD`).
- Raw sources are never modified.
- Pages are concise and scannable. Headers, bullets, links. Avoid walls of text.
