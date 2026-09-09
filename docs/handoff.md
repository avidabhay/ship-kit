# Next-session handoff — 2026-09-10

P0.1 is at a local-tooling checkpoint, not shipped. This file supplies continuity
without relying on the previous conversation. Preserve current work; the user
may have committed or pushed it after this handoff was written.

## Start here

1. Inspect Git status including untracked files, recent commits, and the actual
   configuration/source. Do not reset anything to match this document.
2. Read [implementation-plan.md](implementation-plan.md), README,
   [runtime.md](runtime.md), [format-lint.md](format-lint.md),
   [scanners.md](scanners.md), [coverage-gate.md](coverage-gate.md),
   [checkpoint review](checkpoint-2026-09-10.md), and the existing ADR.
3. Read the sibling roadmap guidance listed in the implementation plan.
4. Use the pinned runtime in separate noninteractive tool shells:

```bash
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh" --no-use
nvm use
```

The user's normal interactive Bash already selects the pinned default. Do not
repeat `nvm use` before each command in the same correctly configured terminal.
Use it when the active version differs or shell initialization requires it.

## Current saved state

- Strict TypeScript, exact runtime/dependency pins, one example/test, coverage
  configuration, and ADR 001 are preserved, including learning comments.
- Biome uses four-space formatting, `linter.rules.preset: "recommended"`, and Git
  ignore integration. Formatting and lint warning failure/recovery were observed.
- Semgrep is installed separately, with an original MIT-licensed direct-eval rule
  in `.semgrep.yml`. The user supplied finding/removal output; independent checks
  established violation exit 1 and restored source exit 0. YAML uses a standalone
  dash at four spaces and all rule fields at eight. Its security scope is narrow.
- Gitleaks is installed separately; `.gitleaks.toml` extends defaults and excludes
  generated coverage/build output. The plural `[[allowlists]]` header is saved.
  Separate file/history scripts are combined by `scan:secrets` using `&&`.
- The user supplied one detected leak and exit 1, then clean current-file and
  history scans and exit 0 after cleanup. Their verbose flag reached nested npm,
  so their output did not name the rule. A separate disposable check established
  the intended `github-pat` finding and full redaction. The project probe is removed.
- Seven local check commands and the end-of-day review are documented in the
  [checkpoint review](checkpoint-2026-09-10.md). Coverage denominators are
  statements/lines 1/1 each and branches/functions 0/0 each.
- README now describes actual local tooling. Scanner installation is documented
  durably. `today.txt` is deliberately ignored; this handoff is versioned.
- CI, build/deployment, a live URL/demo, template publication, and a measured
  deployment quickstart remain pending. No project or learning goal was marked done.

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

The user requested to stage, commit, and push personally to learn Git. The
assistant performs none of those actions. [git-checkpoint.md](git-checkpoint.md)
contains the commands and explanations. At preparation, local `main` and remote
`main` both pointed to `cc19d934550150b3ec7f15f62b84130933eb98f8`, with origin
`https://github.com/avidabhay/ship-kit.git`. Inspect the current state before
assuming the user completed the checkpoint.

After the Git checkpoint is confirmed, introduce minimal CI validation of the
existing local commands in a small guided batch. No workflow exists yet. Verify
changing action pins and API behavior from primary sources during implementation.
Keep build/deployment for subsequent increments. Do not restart setup, repeat
completed probes, add application features/Docker/monorepo tooling, publish a
scaffolder, or mark the project shipped. Setup-time targets remain unmeasured.

## Paste into the next chat

```text
Continue P0.1 — ship-kit in this folder, after the 2026-09-10 local-tooling checkpoint.

Read docs/handoff.md first, then docs/implementation-plan.md, README.md,
docs/runtime.md, docs/format-lint.md, docs/scanners.md,
docs/checkpoint-2026-09-10.md, and the sibling roadmap references in the plan.
Inspect git status (including untracked files), recent commits, and the actual
files. Preserve all existing work and learning comments.

I know Java/Spring Boot and am learning JavaScript/TypeScript. Work in small
related batches: briefly explain the purpose, exact files, and expected behavior;
let me edit and review my results. Avoid a quiz for every command. Implement
for me only when I ask. Keep four-space indentation and Biome's recommended
preset using linter.rules.preset.

Runtime, strict TypeScript, the example/test, coverage gate, Biome formatting/lint,
Semgrep, and Gitleaks local checks are implemented and reviewed. Formatting,
lint, direct-eval, and synthetic-secret finding/recovery exercises are done.
Do not repeat setup or these exercises. Source is restored and the secret probe
was removed. Check the saved checkpoint for final verification results.

Use the pinned runtime through nvm for tool processes. My interactive Bash
already selects the pinned default; do not repeat nvm use in the same correctly
configured terminal. Current-file and Git-history secret scans are separate;
pass extra scanner flags to a leaf npm script, not the composite script.

I requested to stage, commit, and push this checkpoint myself to learn Git.
The assistant prepared instructions but did not perform those operations.
First inspect the actual Git state; do not assume the checkpoint was pushed.
If needed, continue guiding me with docs/git-checkpoint.md and review my output.

After the Git checkpoint is confirmed, the next project batch is minimal CI
validation of the existing local checks. CI has been explained but no workflow
is implemented. Read the plan before proposing the first small workflow edit;
verify changing action/API details against primary sources at that time.
Build/deployment, measured setup time, and final template publication remain.
Do not deploy, add application features/Docker/monorepo tooling, publish a
scaffolder, or mark the project, roadmap, or learning goals complete.
```
