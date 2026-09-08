# New-chat handoff — 2026-09-09

Continue P0.1 in this repository; preserve existing work. This file replaces any
assumption that the next assistant has access to the previous conversation.

## Start here

1. Inspect git status, recent commits, and the actual files.
2. Read [implementation-plan.md](implementation-plan.md),
   [runtime.md](runtime.md), [coverage-gate.md](coverage-gate.md), README,
   and the existing ADR.
3. Read the sibling roadmap guidance listed in the implementation plan.
4. Use `nvm use` from the repo before npm commands. For a noninteractive shell,
   load nvm explicitly:

```bash
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh" --no-use
nvm use
```

## Current state

- Strict TypeScript, one example, one test, and coverage are implemented.
- Vitest and coverage provider match. Unimported source is included.
- Coverage success and threshold failure were demonstrated; learner review is
  complete. The source/test learning comments are intentional.
- Runtime is pinned through `.nvmrc`, exact Node/npm engines, and strict
  installation checks. The latest clean install and all existing checks passed.
- Biome is installed. **No `biome.json` was saved at the last inspection.**
  The user's preview therefore proposed tabs. Formatting/linting is unfinished.
- Scanners, CI, deployment, and final documentation are pending.
- No project/roadmap shipping checkbox has been marked complete; no setup time
  has been measured.

## Teaching agreement

The user knows Java/Spring Boot, has little JavaScript familiarity, and is new
to TypeScript. Explain both JavaScript and TypeScript using concrete Java
comparisons, including where those comparisons differ.

Give one manageable edit at a time, with the exact file, purpose, and expected
pass/fail behavior. Let the user make it, then inspect and review it. Implement
directly when explicitly requested. Do not replace the next edit with broad
planning or a batch of completed configuration.

## Next session

Start with the `biome.json` edit in the implementation plan, then review a
two-space formatting preview. Explain `--write` before applying formatting.
Continue incrementally toward format/lint commands and intentional failures.
Do not start scanners or CI until this milestone is reviewed.

## Paste into a new chat

```text
Continue P0.1 — ship-kit in this folder. First inspect git status and read
docs/handoff.md, docs/implementation-plan.md, docs/runtime.md, and the sibling
roadmap guidance listed there. Preserve existing work.

I know Java and Spring Boot, but have little JavaScript experience and am new
to TypeScript. Teach one small step at a time: explain the purpose, exact file,
and expected behavior, then let me edit and review my result.

Runtime and coverage are complete and verified. Biome is installed, but its
configuration and the formatting/linting milestone are unfinished. Start with
the next concrete step in the implementation plan, after checking actual files.
Do not restart broad planning or mark the project shipped.
```
