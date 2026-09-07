# ADR 001: Record architecture decisions in the repository

- **Date:** 2026-09-08
- **Status:** accepted

## Context

Code shows what we built, but often leaves out why we chose it and which alternatives we considered. Keeping that reasoning only in conversations or external documents makes it harder for future contributors to find the context and understand the tradeoffs.

## Decision

Keep architecture decision records (ADRs) as numbered Markdown files in `docs/adr/`, alongside the code. Review each record with the change it explains so that the decision and its context share the repository's history.

Write an ADR when a choice has lasting consequences for the project's structure, public interfaces, data storage, deployment, security, or dependencies, and involves meaningful tradeoffs or would be costly to reverse. Record the context, decision, alternatives, and consequences. Routine implementation details and easily reversible changes do not need an ADR.

When a decision changes, add a new ADR and mark the earlier record as superseded with a link to its replacement. Preserve the original reasoning.

## Alternatives considered

- **External documents or chat threads** — require readers to look outside the repository and may become inaccessible or disconnected from the relevant code.
- **Commit messages and pull request descriptions only** — provide useful detail but scatter decisions across history instead of offering a stable place to find them.
- **An ADR for every change** — adds maintenance and review work without enough value for routine choices.

## Consequences

Contributors can find and review the reasoning with the code, including the alternatives and constraints that shaped a decision. Records remain available to anyone who clones the repository.

Writing and maintaining ADRs adds work. Keeping the threshold focused on consequential choices limits that cost; failing to update a superseded decision could otherwise leave misleading guidance.
