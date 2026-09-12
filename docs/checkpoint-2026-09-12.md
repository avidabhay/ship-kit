# CI implementation checkpoint — 2026-09-12

P0.1 is in CI implementation, after the verified local-tooling checkpoint.
This records implementation evidence, not project completion or learner mastery.

## Git state

The earlier local-tooling checkpoint was confirmed directly on GitHub at
`56764b84d8e2092d6146ba9dad0bb16a67b48e88` during this continuation. At this status
update, local `main` and the saved `origin/main` still point there. Current source,
formatting, and documentation changes are uncommitted; `.github/workflows/ci.yml`
and `.zed/settings.json` are untracked. The user performs Git writes personally.

## Implemented locally

- Exact runtime/dependency pins, strict TypeScript, coverage gates, Biome,
  Semgrep, Gitleaks, and ADR 001 remain in place.
- The example is deliberately small: one object checked with `satisfies`, one
  test of its behavior and inferred types. Learner comments are preserved.
  The expanded runtime parser and validation matrix were removed at user request.
- Two-space indentation replaces the earlier four-space preference. Biome keeps
  `linter.rules.preset: "recommended"`. Zed's inspected global default and
  TypeScript/TSX overrides already use two spaces; project settings also do.
  YAML format-on-save is disabled to preserve standalone list dashes.
- The workflow targets pushes and pull requests to `main`, with `contents: read`,
  checkout without persisted credentials, Node selected from `.nvmrc`, `npm ci`,
  formatting, lint, typecheck, and coverage. Coverage also runs the tests.
- Semgrep installation and `npm run scan:code` steps are saved after coverage.
  Installation uses a Python virtual environment under `RUNNER_TEMP`, the saved
  CLI pin, and `GITHUB_PATH` for subsequent steps. This installation has not been
  executed on a GitHub runner during this work.

The checkout and setup-node action commit references were resolved from official
release tags during this continuation. This is source inspection, not evidence of
workflow execution. See the actual workflow for pins and commands.

## Actual local verification

After the two-space change, these checks passed using Node `v24.20.0` and npm
`11.19.0` selected through nvm:

| Command | Observed result |
| --- | --- |
| `npm run format:check` | Exit 0; 7 files checked, no fixes |
| `npm run lint` | Exit 0; 7 files, no diagnostics |
| `npm run typecheck` | Exit 0; no TypeScript diagnostics |
| `npm run coverage` | Exit 0; 1 test passed and all four coverage gates passed |
| `npm run scan:code` | Exit 0; 1 rule, 2 files, 0 findings |
| `npm run scan:secrets` | Exit 0; current files and 3 local commits, no leaks |

`npm run format` first formatted 7 supported files and changed 5. A separate
`npm test` was not rerun in this final batch because coverage executed the test.
Coverage counts are statements/lines 1/1 each and branches/functions 0/0 each.
The successful scans do not establish broad security coverage. These runs preceded
this documentation-only status update; they are not fresh checks of every new note.

## Subsequent workflow review — 2026-09-12

The user added Gitleaks installation and both scan steps, then moved the misplaced
root-level `with` block into the checkout step. Inspection confirms `fetch-depth: 0`
and `persist-credentials: false` belong to checkout. All 12 steps parse as YAML;
all shell blocks pass `bash -n`. This is not full GitHub schema validation or a
runner execution. Formatting and both local secret scans passed again, with 3
commits covered by the history scan; Git diff whitespace checks passed.

The workflow is ready for the user's commit/push and first GitHub run. Neither
scanner's CI installation has been verified on GitHub yet. Earlier pending-work
statements above describe the state before this follow-up review.

## Remaining sequence

1. Review staged edits, guide the user's commit/push, and inspect a GitHub Actions run.
2. Add minimal docs build and deployment in later guided increments.
3. Finish README/demo evidence, measure setup-to-live, and configure template
   publication when authorized.

No GitHub CI run, build, deployment, live URL, setup-time measurement, or template
publication has been verified. No project, roadmap, or learning goal is marked done.
