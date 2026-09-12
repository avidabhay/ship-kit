# Next-session handoff — 2026-09-12

P0.1 is in CI implementation. Local tooling is verified; the validation workflow is
implemented locally and GitHub execution is unverified. Preserve existing work.

## Start here

1. Inspect Git status including untracked files, recent commits, and actual files.
2. Read [implementation-plan.md](implementation-plan.md), README,
   [current checkpoint](checkpoint-2026-09-12.md), [runtime.md](runtime.md),
   [format-lint.md](format-lint.md), [scanners.md](scanners.md),
   [coverage-gate.md](coverage-gate.md), and ADR 001. The
   [September 10 checkpoint](checkpoint-2026-09-10.md) is historical evidence.
3. Read the sibling roadmap guidance listed in the plan.
4. Select the pinned runtime for separate noninteractive tool shells:

```bash
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh" --no-use
nvm use
```

Do not repeat `nvm use` in the user's already correctly configured terminal.

## Current saved state

- Strict TypeScript, exact pins, one simple example/test, coverage gates, and
  ADR 001 remain. The test includes inferred-type assertions and learner comments.
- Two-space indentation is the current user preference. Biome's recommended preset
  remains under `linter.rules.preset`. Zed defaults and project settings match;
  automatic YAML formatting is disabled to preserve standalone list dashes.
- Local Semgrep and Gitleaks checks and prior finding/recovery exercises are done.
  No synthetic probe remains. Do not repeat those exercises.
- All six commands in the current checkpoint passed locally; coverage ran the test.
  Gitleaks covered current files and 3 locally available commits.
- `.github/workflows/ci.yml` has quality checks, both scanner installations/scans,
  and full-history checkout. All 12 steps parse and shell blocks pass `bash -n`.
  Scanner installations on the runner and a GitHub run have not been verified.
- No build/deployment, live URL/demo, setup-time measurement, or template publication
  has been verified. No completion or mastery marker was changed.

## Teaching agreement and observed learning

The user knows Java/Spring Boot, has little JavaScript experience, and is new to
TypeScript. Explain syntax and mechanisms with concrete Java comparisons while
stating their limits. Use small related batches, let the user edit, then review.
Avoid a separate quiz or turn for each command. Implement directly when asked.

Preserve the distinction between actions performed and independent understanding.
The user carried out formatting/lint, type/assertion/coverage, Semgrep, and Gitleaks
experiments. They requested help with npm script lookup, command separation,
YAML list/mapping indentation, TOML singular versus plural table names, and why
CI should check formatting without writing. Explanations and successful commands
do not establish mastery. Details remain in the implementation and tooling notes.

Their `npm run scan:secrets -- --verbose` appended `--verbose` to the last nested
npm command, enabling npm logs. To pass the flag to Gitleaks, use
`npm run scan:secrets:files -- --verbose`. Do not require another failure exercise
merely to obtain verbose output; the finding/recovery evidence is already reviewed.

## Git checkpoint and next batch

The earlier checkpoint was confirmed directly on GitHub at `56764b8`. Local
`main` and saved `origin/main` still point there at this update. Current changes
are uncommitted, including the untracked workflow and Zed settings. Inspect again
when resuming; do not assume a later commit or push.

Next, review staged work, guide the user's own staging/commit/push, and inspect the
GitHub Actions result. [git-checkpoint.md](git-checkpoint.md) explains Git commands,
but its original staging list predates the new workflow and editor settings.
Build/deployment follows in later increments. Keep the example simple.

## Paste into the next chat

```text
Continue P0.1 — ship-kit in this folder, at the 2026-09-12 CI implementation checkpoint.

Read docs/handoff.md first, then docs/implementation-plan.md, README.md,
docs/checkpoint-2026-09-12.md, docs/runtime.md, docs/format-lint.md,
docs/scanners.md, and the sibling roadmap references listed in the plan.
Inspect Git status including untracked files, recent commits, and actual files.
Preserve existing work and learner comments.

Use small related guided batches: explain purpose, exact files, and expected
behavior; let me edit and review my results. Implement for me only when asked.
I know Java/Spring Boot and am learning JavaScript/TypeScript. Keep this boilerplate
simple: one typed example and one test. Do not restore the removed runtime parser.

Use TWO-space indentation. Zed global and project settings use two spaces; YAML
format-on-save is disabled. Biome uses indentWidth: 2 and
linter.rules.preset: "recommended". Older four-space notes are historical.

Local tooling and failure/recovery exercises are already verified. Do not repeat
setup or planted violations. Use the pinned runtime through nvm in tool shells;
my correctly configured interactive terminal does not need repeated nvm use.
Pass extra scanner flags to a leaf npm script, not the composite script.

The earlier Git checkpoint was confirmed pushed at 56764b8. Current CI, formatting,
test, and documentation edits are uncommitted at this handoff; inspect actual state.
I perform staging, committing, and pushing personally. The assistant reviews.

The local workflow includes quality checks, Semgrep and Gitleaks installations,
separate secret scans, and full-history checkout. YAML parsing, shell syntax,
formatting, and local secret scans pass. GitHub execution is unverified. Next:
review and a user-performed commit/push, then inspect the first GitHub CI run.
Verify changing action/release details against primary sources before editing.
Build/deployment, setup-time measurement, and template publication remain pending.
Do not deploy, add application features/Docker/monorepo tooling, publish a scaffolder,
or mark the project, roadmap, or learning goals complete.
```
