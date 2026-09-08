# Coverage gate — P0.1

Implemented and verified on 2026-09-08; guided user review completed on 2026-09-09.
This completes the coverage increment, not the roadmap project.

## Run it

```bash
npm run typecheck
npm test
npm run coverage
```

`npm test` runs assertions. `npm run coverage` runs those tests and enforces the
coverage thresholds. `npm run typecheck` checks source, tests, and
`vitest.config.ts`; executing tests alone does not establish type correctness.

## Configuration choices

- **Matching packages:** `@vitest/coverage-v8` and `vitest` are both pinned to
  `5.0.0`. The provider declares that exact Vitest peer dependency. Checked with
  `npm view` against the official registry on 2026-09-08:
  [Vitest metadata](https://registry.npmjs.org/vitest/5.0.0),
  [coverage metadata](https://registry.npmjs.org/@vitest%2Fcoverage-v8/5.0.0).
  The existing package pins were preserved; npm recorded the new dependency tree
  and integrity hashes in the lockfile.
- **V8 provider:** uses the Node runtime's coverage collection. Istanbul is the
  alternative that instruments source. V8 fits this Node-only test suite.
  [Provider guide](https://vitest.dev/guide/coverage.html#coverage-providers)
- **Source selection:** `include: ["src/**/*.ts"]` brings unimported source into
  the report. Test/spec files and declarations are excluded. Without an explicit
  include, unimported code can be absent from the coverage denominator.
  [Include/exclude guide](https://vitest.dev/guide/coverage.html#including-and-excluding-files-from-coverage-report)
- **Thresholds:** 100% each for statements, branches, functions, and lines,
  applied to the source aggregate. This is a deliberate starting policy for one
  tiny example. Future projects should review the cost of exercising exceptional
  paths before adopting it unchanged; coverage alone cannot judge assertions.
- **Reports:** terminal text, HTML at `coverage/index.html`, and machine-readable
  counts at `coverage/coverage-summary.json`. The report directory is explicit.
  Generated `coverage/` and `.vitest/` output is ignored by Git.
  [Coverage options](https://vitest.dev/config/coverage)

## Observed results

| State / command | Exit | Result |
| --- | --- | --- |
| Before coverage changes: typecheck and test | 0 each | One test passed |
| Gate configured: typecheck, test, coverage | 0 each | One test passed; statement and line coverage 1/1 |
| Test temporarily removed: `npm run coverage` | 1 | No tests found; source still reported; threshold errors |
| Test still absent: `npm run coverage -- --passWithNoTests` | 1 | Source at 0/1 statements and lines; threshold errors |
| Test restored: typecheck, test, coverage | 0 each | One test passed; statement and line coverage 1/1 |

The negative runs reported:

```text
ERROR: Coverage for lines (0%) does not meet global threshold (100%)
ERROR: Coverage for statements (0%) does not meet global threshold (100%)
```

The one-off `--passWithNoTests` flag bypassed only the missing-test guard.
Although Vitest printed “No test files found, exiting with code 0”, its final
process status was **1** because coverage failed. The flag is absent from the
committed script and config.

`src/example.ts` appeared in the JSON report even with no test importing it.
The original test was renamed to `src/example.test.ts.coverage-backup` during
the probe and restored in a `finally` block; its bytes were checked for equality.
At the end of that 2026-09-08 probe, the source, original test, and ADR had no
diff from the starting commit. Subsequent guided exercises expanded the type
alias and added learner comments; those edits are preserved.

Final coverage: statements **1/1**, lines **1/1**, branches **0/0**, functions
**0/0**. All display 100%, but the example contains no branches or functions.
These are coverage observations, not setup-time measurements or proof of
thorough behavioral testing.

## Repeat the threshold failure

Run from the repository root in Bash. This temporarily removes the only test
from discovery and restores it on exit. Stop other test/watch processes first.

```bash
(
  set -eu
  test_path=src/example.test.ts
  backup_path=src/example.test.ts.coverage-backup
  test -f "$test_path"
  test ! -e "$backup_path"
  mv "$test_path" "$backup_path"
  trap 'mv "$backup_path" "$test_path"' EXIT
  trap 'exit 130' INT
  trap 'exit 143' TERM

  coverage_status=0
  npm run coverage -- --passWithNoTests || coverage_status=$?
  test "$coverage_status" -eq 1
)
npm run typecheck && npm test && npm run coverage
```

Look for the explicit threshold errors above and `example.ts` at 0% in the
negative run. A nonzero exit from an unrelated error is not sufficient evidence.

## Review status

Guided review completed on 2026-09-09, including the learner's type, assertion,
and unimported-source experiments. Formatting/linting is the current unfinished
milestone. See the [implementation checklist](implementation-plan.md).
