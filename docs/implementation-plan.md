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
- [ ] Formatting/linting: Biome installed; config, commands, fixes, and violation
  demonstrations remain unfinished.
- [ ] Local scanners: Semgrep and Gitleaks commands and demonstrated violations.
- [ ] CI: test → scan → build → deploy workflow.
- [ ] Deployment: Cloudflare Pages docs and GitHub template configuration.
- [ ] Final documentation: required README sections, tool tradeoffs, and an actual
  measured setup run.

## Next concrete step

The user creates `biome.json` next to `package.json`:

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2
  }
}
```

Then preview one file with:

```bash
./node_modules/.bin/biome format src/example.ts
```

On 2026-09-09, the user ran this command before saving the config. The preview
proposed tabs (arrows in the diff), the default. Inspection confirmed that
`biome.json` was absent. Do not claim a two-space configuration was implemented.
With the intended config saved, expect two-space indentation and a semicolon
after the type alias. Review the preview before assigning `--write`.
Lint policy, repository ignores, npm scripts, and demonstrated lint violations
are later small steps within this same milestone.

## Learner context

The user knows Java and Spring Boot, with little JavaScript familiarity, and is
beginning TypeScript. Explain JavaScript syntax too, using Java comparisons and
their limits. Before each edit, state its purpose, exact file, and expected
pass/fail behavior. Default to one manageable user edit and review it before
another. Implement directly when asked. Preserve the user's learning comments.

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

On 2026-09-09: nvm installation, fresh Bash selection, and old-runtime rejection
were checked. A clean `npm ci`, typecheck, test, and coverage all passed under
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
The README still has unfinished template sections.
