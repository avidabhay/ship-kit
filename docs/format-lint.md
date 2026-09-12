# Formatting, linting, and CI notes

Formatting/lint evidence: 2026-09-09. The later full local review is recorded in
[the 2026-09-10 checkpoint](checkpoint-2026-09-10.md). These notes do not mark the
project or a learning goal complete.

## Current status — 2026-09-12

The user chose two-space indentation throughout Zed and this project. Biome and
project editor settings now agree. YAML format-on-save is disabled in
`.zed/settings.json` to preserve standalone list dashes. Older four-space examples
below explain the previous exercises, not the current indentation requirement.

The workflow now contains the npm quality checks, Semgrep, and Gitleaks steps
locally; a verified GitHub run remains pending. The
[current checkpoint](checkpoint-2026-09-12.md) records passing local checks after
reformatting: 7 supported files checked by formatting/lint, 1 test via coverage.

## Saved configuration

`biome.json` enables two-space formatting, the recommended lint preset, and
Git ignore integration. Use `linter.rules.preset: "recommended"`: the earlier
`recommended: true` option still works but emits a deprecation diagnostic.
The existing `.gitignore` excludes generated output such as `coverage/`.

The project is a reusable TypeScript template. Its small source module and test
exercise the setup; later projects that copy the template add application logic.
The formatter, linter, tests, and compiler do different jobs.

## Commands

Use a terminal with the pinned runtime selected. Run `nvm use` only when
selection is needed; it is not required before each command in the same
correctly configured terminal. Each name below selects its entry in
`package.json` under `scripts`.

| Command | Purpose | Writes source/config files? |
| --- | --- | --- |
| `npm run format` | Apply Biome formatting | Yes, when formatting differs |
| `npm run format:check` | Report formatting differences | No |
| `npm run lint` | Inspect code for lint violations; fail on warnings or errors | No |
| `npm run typecheck` | Check TypeScript types without emitting JavaScript | No |
| `npm test` | Execute Vitest assertions | No |
| `npm run coverage` | Execute tests and enforce coverage thresholds | No; generates coverage reports |

`npm run lint` runs `biome lint . --error-on-warnings`. The dot selects the
current project directory, including supported root configuration files.
`format:check` is a script name; its colon does not invoke another script.

`npm run test` also works. npm finds the `test` entry, then executes its saved
value, `vitest run`, with local executables available. `npm run vitest run`
would look for a script named `vitest`, which this package does not define.
`run format` is missing the `npm` executable name.

For multiple commands, use separate lines or `&&`:

```bash
nvm use
npm run format:check && npm run lint
```

With `&&`, the right-hand command runs only if the left-hand command succeeds.
Writing `nvm use ./node_modules/.bin/biome lint .` does not execute Biome as a
second command; it passes those words to nvm.

## Evidence at this checkpoint

The user supplied a failing formatting preview for `tsconfig.json`, then ran
`npm run format` successfully. The first write fixed one file; the second write
found nothing more to change. Their final format and lint checks passed.

Independent verification at the prior handoff, through the pinned nvm runtime
(these five checks were not rerun during the lint exercise):

| Command | Exit | Result |
| --- | --- | --- |
| `npm run format:check` | 0 | 6 files, no fixes |
| `npm run lint` | 0 | 6 files, no diagnostics or fixes |
| `npm run typecheck` | 0 | No diagnostics |
| `npm test` | 0 | 1 test file, 1 passing test |
| `npm run coverage` | 0 | 1 passing test; thresholds satisfied |

Parsed `tsconfig.json` values are identical to the last committed version; only
layout changed. Package engine requirements and dependency pins are also unchanged.
Coverage totals are statements 1/1, lines 1/1, branches 0/0, and functions 0/0.
All display 100%; the example contains no branches or functions.

For the subsequent lint exercise, the user ran `nvm use`, added
`const unused = "temporary";` after the export in `src/example.ts`, and supplied
the resulting `lint/correctness/noUnusedVariables` warning at line 13, column 7.
`npm run lint` checked 6 files, applied no fixes, and exited 1. After the user
removed the temporary line, their lint run checked 6 files, applied no fixes,
and exited 0. The warning failed the command because its script includes
`--error-on-warnings`.

Source inspection confirmed the temporary line was removed and the file matched
its pre-exercise content, preserving the existing learning comments and semicolon
change. These lint results are user-supplied evidence; no new checks were run
independently. Formatting and lint failure/recovery have now both been observed.
No new install, commit, push, scanner, workflow, or deployment was performed
during this checkpoint.

## What CI means

CI stands for continuous integration: regularly integrating code changes and
using automated builds/checks to catch problems. With GitHub Actions, a push or
pull request can trigger a workflow on a runner, a machine that executes the job.
A typical job checks out the submitted code, installs the selected runtime and
locked dependencies, runs checks, and reports success or failure.

Think of a Java project whose Jenkins job runs its Maven checks automatically.
Here, the local workflow invokes our npm scripts. Its GitHub execution is not
yet verified. Deployment is a later step in the existing project plan.

Conceptual future flow, not a claim of current implementation:

```mermaid
flowchart LR
    A[Push or pull request] --> B[Runner checks out code]
    B --> C[Install runtime and dependencies]
    C --> D[Run project checks]
    D --> E[Report pass or fail]
```

### Why CI should check formatting without writing

Suppose a commit contains two-space indentation while this project requires four.
`format:check` reports the mismatch and fails. The developer runs `format` locally,
reviews the change, and commits the corrected file.

If a validation job instead runs `format`, it can repair only the runner's
checkout and succeed. That does not update the submitted commit; the repository
can still contain the original formatting mismatch. Our CI check should report
whether submitted files already satisfy the rule. A separate workflow that
proposes formatting fixes is possible, but is not part of this project plan.

## Learning evidence and follow-up

- The user executed and supplied the formatting failure/fix/pass sequence.
- They also supplied the temporary unused-variable warning and lint exit 1,
  followed by removal and lint exit 0 under the pinned runtime.
- They asked for help with npm script-name lookup and shell command separation;
  the explanations above are available for quick reference.
- They could not explain why CI should use `format:check` and requested a CI
  introduction. The explanation is supplied here and in chat; independent
  understanding has not been assessed.
- The user prefers faster progress with learning preserved: small related edit
  batches, short explanations tied to the template's purpose, and reviews of
  their actual edits. Do not infer mastery from passing checks or acknowledgments.
- Review the implementation plan before selecting the next small batch. Do not
  repeat the observed formatting or lint exercises merely to manufacture failures.

## Primary references

- [GitHub Actions concepts](https://docs.github.com/en/actions/get-started/understand-github-actions)
- [Biome CLI](https://biomejs.dev/reference/cli/)
- [Biome CI guidance](https://biomejs.dev/recipes/continuous-integration/)
- [Biome Git integration](https://biomejs.dev/guides/integrate-in-vcs/)
- [npm script lookup and executable paths](https://docs.npmjs.com/cli/v11/commands/npm-run/)
- The installed Biome CLI confirmed `noUnusedVariables` is recommended with warning
  severity, and `--error-on-warnings` makes warning diagnostics fail the command.
