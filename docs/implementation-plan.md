# P0.1 implementation plan

Local implementation status only; the roadmap project is not done or shipped.
Keep continuity across chats in this repo. Start a new chat with
[the handoff](handoff.md).

- [x] Package setup: exact pins and lockfile, strict TypeScript, example,
  one test, and ADR 001.
- [x] Coverage gate: matching provider, unimported source inclusion, explicit
  thresholds, passing run, deliberate failure, and restored passing checks.
- [x] Guided review: types, assertions, and coverage experiments.
- [x] Reproducible runtime: exact Node/npm, nvm setup, install guard, clean install.
- [x] Formatting/linting: config, repository-wide scripts, formatting fixes, and
  passing checks verified; user demonstrated lint warning failure and recovery.
- [x] Local scanners: Semgrep and Gitleaks commands, reviewed findings, and
  restored passing scans. This records implementation evidence, not mastery.
- [ ] CI: test → scan → build → deploy workflow.
- [ ] Deployment: Cloudflare Pages docs and GitHub template configuration.
- [ ] Final documentation: required README sections, tool tradeoffs, and an actual
  measured setup run.

## What this project builds

`ship-kit` is a reusable TypeScript project template. Most implementation is
configuration and automation: consistent runtime/dependencies, type checking,
tests and coverage, formatting/linting, scans, and eventually CI/deployment.
The small source example and executable test demonstrate that the setup works.
Application features belong to projects that later copy this template; this
project's existing brief explicitly excludes application logic. The quickstart
and setup-time goals remain unmeasured.

The user asked how these configuration edits connect to the project and whether
application coding is expected. Explain each next edit's purpose in that context,
using their Java/Spring Boot experience, before presenting syntax. Keep the
existing scope. The user now requests a faster pace with learning preserved:
bundle small related edits, give a short explanation, let the user implement,
and review the result. Avoid a separate quiz or turn for every command.

## Next concrete step

Close the local-tooling checkpoint. The user performs Git staging, committing,
and pushing themselves using [git-checkpoint.md](git-checkpoint.md); review their
output. The assistant has not performed these actions. At the next session,
inspect actual Git state first and finish that guided checkpoint if needed.
Then introduce a minimal CI validation workflow for existing local checks, with
fresh primary-source verification of action pins before implementation. No CI or
deployment has been implemented. Do not repeat the completed scanner exercises.

See the [2026-09-10 checkpoint review](checkpoint-2026-09-10.md) for final checks,
review findings, and fixes. Durable scanner setup is in [scanners.md](scanners.md).

## Gitleaks finding/recovery review — 2026-09-10

- The user supplied one detected leak and exit 1. After cleanup, their combined
  script ran both current-file and Git-history scans with no leaks and exit 0.
  The synthetic probe is absent from the saved project.
- Their command was `npm run scan:secrets -- --verbose`, so the appended flag
  reached the nested `npm run scan:secrets:history` invocation. It enabled npm
  logging instead of Gitleaks finding details. The output therefore establishes
  a detected leak and recovery, but does not independently identify `github-pat`.
  The earlier disposable fixture verification below establishes that rule and
  redaction separately. No repeat of the user's exercise is required.
- To request Gitleaks details directly, use the leaf command
  `npm run scan:secrets:files -- --verbose`. Script lookup and argument forwarding
  remain practice topics; do not infer mastery from command output.
- The user requested an end-of-day codebase review, necessary local fixes, a
  next-session prompt, and guidance to commit/push themselves. The assistant is
  authorized to edit local files for that review, but not to stage, commit, or push.

## Earlier Gitleaks correction and exercise preparation — 2026-09-10

- The user reports success after correcting the header. Inspection confirms
  `[[allowlists]]`; independent `npm run scan:secrets` through nvm completed
  both scans with no leaks and exit 0. History covered 2 local commits.
- The assistant verified the proposed synthetic fixture in a disposable `/tmp`
  file: one `github-pat` finding, exit 1, and full redaction in verbose output
  and JSON. Removing the disposable fixture restored no findings and exit 0.
  Temporary files were removed; no probe was planted in the project.
- The fixture uses the GitHub PAT prefix and a shuffled 36-character alphanumeric
  suffix. The ordinary forward-alphabet example is a built-in allowlist stopword
  and would be ignored. Verify the selected fixture if recreating it later; do
  not store a complete credential-shaped value in these scanned notes.
  [Pinned rule/defaults](https://github.com/gitleaks/gitleaks/blob/v8.30.1/config/gitleaks.toml)
- These are independent scanner checks. The user's secret-finding exercise
  was still pending at this preparation; later user evidence is above. The original
  five checks were not rerun.

## Gitleaks configuration diagnosis — 2026-09-10

- The user supplied `AllowList expected a map, got slice` and exit 1. The directory
  scan failed before detection; `&&` prevented the history scan from starting.
  This is a configuration failure, not a demonstrated secret-finding gate.
- Inspection confirms Gitleaks `8.30.1` on PATH, the intended three npm scripts,
  and the singular `[[allowlist]]` header in the saved TOML.
- Independent `npm run scan:secrets` through nvm reproduced the exact failure.
  A temporary config containing only `[[allowlist]]` reproduced the same error.
  Adding just the missing `s` to a temporary copy of the full config made both
  directory and history scans pass with no leaks and exit 0. Temporary files
  were removed; the assistant left the project config for the user to correct.
- Double brackets create an array of tables. The singular legacy `allowlist`
  field expects one object; plural `allowlists` accepts the list. This is like
  providing a Java `List<Allowlist>` to a field expecting one `Allowlist`.
  [Pinned schema](https://github.com/gitleaks/gitleaks/blob/v8.30.1/config/config.go)
- This narrow CLI/schema comparison replaced a broad debugging search; no
  persistent regression test or application changes were needed for the typo.
  The five original checks were not rerun. No mastery or completion was inferred.

## Gitleaks preparation — 2026-09-10

- Gitleaks was absent from PATH. The assistant prepared the official v8.30.1
  Linux x64 binary at `/tmp/ship-kit-gitleaks-y4c1l1ip/gitleaks`; `version`
  reports `8.30.1`. The release archive matched its published SHA256:
  `551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb`.
  This `/tmp` path is ephemeral, not a persistent installation.
- Independent scans using that binary and the proposed configuration saved only
  beside the prepared binary both exited 0 with no leaks: current files via `dir`,
  and 2 locally available commits via `git`. These checks validate the proposed
  configuration; they are not user-completed setup or learner evidence.
- At preparation, user installation and project edits were pending. The later
  installation and config-load failure are recorded above. No user Gitleaks
  secret finding/recovery has been demonstrated; keep the scanners milestone open.
- The proposed `.gitleaks.toml` uses `[extend]` with `useDefault = true`,
  adding a global path allowlist for generated `coverage` and `dist` directories.
  Default rules and allowlists remain active.
- `dir` covers current files, including untracked files and gitignored `.env`
  files; it does not consult `.gitignore`. Built-in allowlists already exclude
  `node_modules`, `.git`, and npm lockfiles. `git` covers locally available Git
  history; it does not replace the current-file scan. A shallow checkout limits
  the available history.

Proposed npm scripts at preparation (subsequently saved):

| Script | Command |
| --- | --- |
| `scan:secrets:files` | `gitleaks dir --config .gitleaks.toml --redact=100 --exit-code 1 .` |
| `scan:secrets:history` | `gitleaks git --config .gitleaks.toml --redact=100 --exit-code 1 .` |
| `scan:secrets` | `npm run scan:secrets:files && npm run scan:secrets:history` |

Full redaction applies to detected secrets. Findings return exit 1; scan errors
can also fail, so inspect the diagnostic. The aggregate runs history only after
the current-file scan succeeds.

Primary references: [v8.30.1 release](https://github.com/gitleaks/gitleaks/releases/tag/v8.30.1),
[release assets](https://github.com/gitleaks/gitleaks/releases/expanded_assets/v8.30.1),
[tagged defaults](https://github.com/gitleaks/gitleaks/blob/v8.30.1/config/gitleaks.toml),
[directory walker](https://github.com/gitleaks/gitleaks/blob/v8.30.1/sources/files.go),
[Git source](https://github.com/gitleaks/gitleaks/blob/v8.30.1/sources/git.go),
and [CLI flags and exits](https://github.com/gitleaks/gitleaks/blob/v8.30.1/cmd/root.go).

## Semgrep finding/recovery and YAML review — 2026-09-10

- The user's supplied output identifies `ship-kit-no-direct-eval` for
  `eval("1 + 1");` at `src/example.ts` line 13, followed by a restored run with
  0 findings. Numeric exit-status lines were not supplied for these two runs;
  do not present exit 1/0 as observed user evidence.
- After the YAML correction, independent `npm run scan:code` through the pinned
  nvm runtime exited 0: 1 rule, 2 files, 0 findings. This is separate from the
  user's supplied output.
- To verify numeric failure without repeating the user's edit, the assistant
  copied the saved rule, package script, and source into a disposable `/tmp`
  directory, then appended the same `eval` line there. Running
  `npm run --silent scan:code -- --json` in that copy exited 1 with exactly
  `ship-kit-no-direct-eval` at line 13 and no scanner errors. The temporary
  directory was removed, and repository source was confirmed byte-for-byte
  unchanged. This is assistant verification, not additional learner evidence.
- The user explicitly requested a YAML indentation explanation and asked the
  assistant to make that edit. Their latest partial edit kept `- id` at four
  spaces but moved sibling fields to eight, misaligning the rule's mapping keys.
  The assistant corrected the file: dash alone at four spaces, all five rule
  fields at eight. Sibling mapping keys now align; the rule's meaning is preserved.
- Observed finding/removal and requested assistance are learning evidence;
  they do not establish independent mastery of YAML or static analysis. The
  combined local-scanners milestone was still open at this point; later Gitleaks
  evidence is recorded above.

## Semgrep baseline review — 2026-09-10

- The user installed Semgrep and saved `.semgrep.yml` plus the `scan:code` npm
  script. Independent CLI inspection reports `1.176.1`, matching the audit pin
  checked against PyPI during this session.
- The original MIT-licensed rule `ship-kit-no-direct-eval` targets TypeScript
  direct `eval(...)` calls with severity `HIGH`. This single rule provides narrow
  coverage; a clean scan does not establish overall application security.
- The script is `semgrep scan --config .semgrep.yml --error --strict --metrics=off
  --disable-version-check src`. Findings fail via `--error`; `--strict` also
  fails warning-level scan errors. This is a local source-code scan.
- Independent baseline through the pinned nvm runtime exited 0: 1 rule, 2 source
  targets, 0 findings. The application was not executed; the five existing checks
  were not rerun. No scanner violation had been demonstrated at that baseline;
  the subsequent user-supplied finding and recovery are recorded above.
- Initial YAML was valid with mapping fields at six spaces after `- id`.
  A style-only adjustment was proposed: dash alone at four spaces, all rule
  fields at eight. The subsequent user edit and requested help are recorded above.
- The user requested a short Semgrep introduction and questioned repeated
  runtime selection. These were explained; fresh interactive Bash already
  selects the pinned default, so do not repeat `nvm use` in the user's same
  correctly configured terminal. See [runtime.md](runtime.md). Separate
  noninteractive tool shells still need explicit nvm initialization.
- Installation and saved configuration are observed work. Do not infer independent
  mastery of rules, shell behavior, or static analysis from successful commands.

## Lint failure/recovery review — 2026-09-09

The user added this temporary line in `src/example.ts`, after the existing export:

```ts
const unused = "temporary";
```

The supplied output shows `lint/correctness/noUnusedVariables` at line 13,
one warning, 6 files checked, and no fixes. `--error-on-warnings` made the command
fail with exit 1; the diagnostic remained a warning. This was the intended rule,
not a parse/config error. The underscore-prefixed name suggested by Biome was
not applied; the user removed the temporary declaration.

The user selected the pinned runtime through nvm and ran commands on separate
lines so the exit-status print referred to lint:

```bash
nvm use
npm run lint
printf 'lint exit: %s\n' "$?"
```

After removal, the user's second lint run checked 6 files with no diagnostics or
fixes and exited 0. Independent file inspection confirms `src/example.ts` matches
the saved state before the exercise, with learning comments intact. Its existing
diff from HEAD is still only the type alias's formatting semicolon.

These two runs are user-supplied evidence; the assistant did not rerun lint or
the five-check suite during this review. The earlier independent results remain
recorded below. This demonstrates the failure/recovery sequence, not independent
mastery of all the underlying mechanisms.

CI has been explained but is not implemented. Revisit the reason for checking
formatting without writing in a later practical example; the user asked for a
faster pace, so do not require a separate quiz before each edit.

## Earlier formatting checkpoint — 2026-09-09

- The user saved all six npm scripts, applied formatting, and supplied passing
  `format:check` and lint output. The first formatting run fixed one file;
  a second run made no changes.
- Independent checks of the saved state all exited 0: `format:check`, lint,
  typecheck, test, and coverage. Format/lint checked 6 files; Vitest ran 1 passing
  test. Details and coverage denominators are in [format-lint.md](format-lint.md).
- Parsed `tsconfig.json` is unchanged from HEAD; engine and dependency pins are
  also unchanged. Source/test learning comments are preserved.
- The user's `run format` typo omitted `npm`; they subsequently used the correct
  command successfully. Record this as command practice, not proof of mastery.
- The user requested an explanation of CI and why checks should not rewrite the
  runner's checkout. Notes are saved; independent understanding is not assessed.
- This is a local, uncommitted checkpoint. `biome.json` and `docs/format-lint.md`
  are new files. `today.txt` is an ignored local continuation prompt, updated for
  the next chat. No project/roadmap completion marker was changed.

## Ignore and command review — 2026-09-09

- The user saved `vcs.enabled: true`, `vcs.clientKind: "git"`, and
  `vcs.useIgnoreFile: true`. Inspection confirms them; the root lint check passed
  independently under nvm with 6 files checked and no diagnostics.
- The user entered `nvm use ./node_modules/.bin/biome lint .` on one line.
  That invoked nvm, not a second Biome command. Explain separate command lines
  or `&&`; do not treat the pasted nvm-only output as lint evidence.
- `biome lint . --error-on-warnings` independently passed (6 files, exit 0).
  Installed CLI help confirms the warning failure behavior.
- `biome format .` independently checked 6 files and exited 1 without fixes.
  Only `tsconfig.json` had formatting differences. No generated coverage output
  or lockfile rewrite was proposed. The user subsequently saved the npm scripts
  and formatted the file; see the earlier formatting checkpoint above.

## Lint script review — 2026-09-09

- The user replaced the assistant's deprecated `linter.rules.recommended: true`
  guidance with `linter.rules.preset: "recommended"`. Inspection confirms the
  saved correction. User-supplied output shows the config lint check (1 file)
  and `npm run lint` (2 files) passing without the deprecation diagnostic.
- Explicit recommended lint configuration was saved and reviewed. The direct
  `biome lint src` check independently passed through nvm with exit 0.
- The user added the `lint` npm script and changed `package.json` indentation to
  four spaces. Inspection confirms those changes; other script commands and
  dependency pins are preserved.
- The user supplied successful `npm run lint` output showing `biome lint src`
  and 2 files checked. This is lint evidence, not a test execution.
- The user identified `npm run test`, needed a worked example for selecting
  `typecheck`, then supplied successful typecheck, test, coverage, and lint output.
  Vitest reported one passing test; coverage reported 100% in each category for
  the tiny example. These are user-supplied results, not new independent reruns.
- Explained why `npm run vitest run` looks for a script named `vitest`, while
  `npm run test` finds `"test": "vitest run"` and executes its saved command.
  The user said they understood and requested the next step. Script-name lookup
  remains a topic for later practice; acknowledgment and successful commands
  alone do not establish independent mastery.

## Formatting review — 2026-09-09

- The user saved the initial two-space configuration and supplied the expected
  preview: reduced indentation and a semicolon after the type alias.
- After discussing `--write`, the user applied formatting and chose four spaces
  instead. Inspection confirms `indentStyle: "space"`, `indentWidth: 4`, and the
  semicolon in `src/example.ts`; learning comments are preserved.
- The source formatting check independently passes through nvm. The user reports
  the existing test also passed; it was not rerun during that early review.
  The earlier formatting checkpoint above includes an independent test run.
- The user predicted the test result would stay unchanged but was unsure of the
  role of linting. Formatting, linting, and test assertions were distinguished;
  an independent explanation of that distinction has not yet been reviewed.

## Learner context

The user knows Java and Spring Boot, with little JavaScript familiarity, and is
beginning TypeScript. Explain JavaScript syntax too, using Java comparisons and
their limits. Before each edit, state its purpose, exact file, and expected
pass/fail behavior. The latest pacing preference is small cohesive batches
with concise teaching and a review after the user's edit. Use individual smaller
steps when a concept is difficult. Implement directly when asked. Preserve the
user's learning comments.

Completed on 2026-09-09:

- Boolean type-error experiment, then restored `phase: 0`.
- Expanded `Record` into equivalent explicit properties, each
  `string | number`; discussed aliases, objects, unions, `const`, `export`,
  and `satisfies`.
- Intentional assertion mismatch followed by restoration. The supplied failing
  output compared the lowercase value directly with `"WRONG"`; the original
  uppercase assertion is active again.
- User reports temporary unimported source at 0% coverage; terminal output was
  cleared. Cleanup and passing checks were independently verified.
- Installed Biome with an exact development dependency. Encountered engine
  warnings, learned how PATH selects Node, then requested a reproducible setup
  and a GitHub checkpoint before continuing in a new chat.

## Verified state

The latest local checks after formatting are recorded above and in
[format-lint.md](format-lint.md). Earlier on 2026-09-09, nvm installation, fresh
Bash selection, and old-runtime rejection were checked. A clean `npm ci`, typecheck, test, and coverage all passed under
Node `24.20.0` / npm `11.19.0`. Biome `2.5.12` is installed.
Coverage: 1/1 statements and lines; 0/0 branches/functions. Setup time remains
unmeasured. See [runtime setup](runtime.md) and [coverage evidence](coverage-gate.md).

## Source guidance

Read these in `../sixty-week-spine` when resuming:
`AGENTS.md`, `.agents/skills/ship-project/SKILL.md`,
`phases/phase-0/projects/P0.1.md`, `phases/phase-0/README.md`, the newest audit
actually present in `phases/phase-0/verified/`, and the P0.1 section of
`plan/01-roadmap.md`. At last inspection, the newest audit was
`2026-09-08.md` and the phase README linked to that existing file.

No application features, Docker, monorepo tooling, or scaffolder publishing.
Do not mark roadmap completion, deployment, or unmeasured targets as achieved.
The README describes current local tooling; final demo/deployment evidence and
measured quickstart remain pending.
