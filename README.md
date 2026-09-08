# ship-kit

> A TypeScript project template that goes from clone to live URL in ten minutes, with tests, CI and supply-chain checks already wired.

**Status:** local tooling in progress; deployment is pending. See the
[implementation plan](docs/implementation-plan.md) and [new-chat handoff](docs/handoff.md).

<!-- A GIF or screenshot of it doing something real, right here. Above the fold. -->

## What it does

<Three or four sentences. Assume the reader has 60 seconds and has never heard of this.>

## Architecture

<A diagram. Mermaid renders on GitHub — use it rather than describing boxes in prose.>

```mermaid
flowchart LR
  A[client] --> B[worker]
  B --> C[(postgres)]
```

## Why this design

<Three decisions and the alternative you rejected, one short paragraph each. This section is
half the value of the repo. Most portfolios skip it.>

1. **<Decision>** — chose X over Y because …
2. **<Decision>** — …
3. **<Decision>** — …

## Numbers

<Measured, not estimated. "About 40 req/s before the connection pool bites, here is the graph"
beats "it's fast" in every interview.>

| Metric | Value | How measured |
| ------ | ----- | ------------ |
|        |       |              |

## Where it fails

<Honest limitations. What breaks, at what scale, and what you would do about it. This is the
section that reads as senior.>

## Run it

Local tooling is implemented through the coverage gate. Biome is installed;
formatting/linting setup and the deployment quickstart are still pending.
Follow [runtime setup](docs/runtime.md) to install nvm first.

```bash
nvm install
nvm use
npm ci
npm run typecheck
npm test
npm run coverage
```

Coverage requires 100% of source statements, branches, functions, and lines,
including unimported source. See the [coverage explanation and verification](docs/coverage-gate.md)
and [implementation checklist](docs/implementation-plan.md) for current progress.

## Out of scope

<Copied from the spec. Says as much about your judgement as the feature list does.>

## Versions

<Every dependency that matters, pinned, with the date you last checked it. Cross-check against
the phase's newest file in `phases/phase-<N>/verified/`.>

_Last verified: <YYYY-MM-DD>_
