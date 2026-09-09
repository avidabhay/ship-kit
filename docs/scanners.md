# Local scanners

Run scanner commands from the repository root with the pinned Node/npm runtime
active; see [runtime.md](runtime.md). Semgrep and Gitleaks are separate CLIs on
`PATH`. Their versions are manually pinned below; `npm ci` neither installs nor
enforces them. CI and deployment remain pending.

## Installation

The current workstation already has both tools. These instructions replace the
earlier ephemeral `/tmp` installation path for future setup. They have not been
validated as a complete fresh-machine installation or timed setup run.

Semgrep uses an isolated Python tool environment managed by `uv`:

```bash
uv tool install 'semgrep==1.176.1'
semgrep --version
```

Expect `1.176.1`. This assumes `uv` is installed; see its
[installation guide](https://docs.astral.sh/uv/getting-started/installation/).
Semgrep documents [installation through uv](https://docs.semgrep.dev/getting-started/quickstart-ce);
the exact package is on [PyPI](https://pypi.org/project/semgrep/1.176.1/).

For **Linux x86_64**, the following downloads the official Gitleaks `8.30.1`
archive, checks its published SHA256 before extraction, and installs only the
binary into the user's command directory. It requires Bash, `curl`, `tar`,
`sha256sum`, and `install`. The subshell stops on failure and removes its temporary
directory when it exits. Other platforms need the matching release asset and hash.

```bash
(
    set -euo pipefail
    ship_kit_gitleaks_tmp=$(mktemp -d)
    trap 'rm -rf -- "$ship_kit_gitleaks_tmp"' EXIT
    cd "$ship_kit_gitleaks_tmp"
    curl --fail --location --output gitleaks.tar.gz \
        https://github.com/gitleaks/gitleaks/releases/download/v8.30.1/gitleaks_8.30.1_linux_x64.tar.gz
    printf '%s  %s\n' \
        551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb \
        gitleaks.tar.gz | sha256sum --check -
    tar -xzf gitleaks.tar.gz gitleaks
    install -Dm755 gitleaks "$HOME/.local/bin/gitleaks"
    "$HOME/.local/bin/gitleaks" version
)
```

Expect a successful checksum check and version `8.30.1`. The checksum comes from
[the official release assets](https://github.com/gitleaks/gitleaks/releases/expanded_assets/v8.30.1).
If `gitleaks` is not found by name, add its directory to the current shell:

```bash
export PATH="$HOME/.local/bin:$PATH"
gitleaks version
```

## Commands and scope

| npm command | What it checks |
| --- | --- |
| `npm run scan:code` | TypeScript under `src` against `.semgrep.yml` |
| `npm run scan:secrets:files` | Current files under the repository root |
| `npm run scan:secrets:history` | Git patches in locally available history |
| `npm run scan:secrets` | Current files, then history if the first scan succeeds |

Semgrep parses code without running the application. The original MIT-licensed
`ship-kit-no-direct-eval` rule matches direct `eval(...)` calls. Keeping one local
rule makes behavior easy to inspect, but gives narrow coverage: zero findings
means this pattern was absent, not that the application is secure. `--error`
makes findings fail; `--strict` also fails on warning-level scan errors.
The script disables metrics and version checks.
[Semgrep CLI reference](https://docs.semgrep.dev/cli-reference)

Gitleaks is retained from the project plan. Upstream now limits future releases
to security patches, which is a maintenance tradeoff to revisit when updating
tool choices. [Upstream status](https://github.com/gitleaks/gitleaks#readme)

Gitleaks detects credential-like text using its built-in rules. Our TOML extends
those defaults and adds exclusions for generated `coverage` and `dist`
directories. The defaults already exclude `node_modules`, `.git`, and npm
lockfiles. Directory scans do not consult `.gitignore`: current untracked files
and ignored `.env` files remain eligible unless a scanner exclusion applies.
[Tagged defaults](https://github.com/gitleaks/gitleaks/blob/v8.30.1/config/gitleaks.toml),
[directory scanning implementation](https://github.com/gitleaks/gitleaks/blob/v8.30.1/sources/files.go)

History scanning covers only locally available history; a shallow clone limits
that coverage. The last reviewed run covered 2 local commits. All saved Gitleaks
scripts use `--redact=100` and `--exit-code 1`: detected values are fully redacted
and findings fail with exit 1. Configuration or execution errors can also fail,
so read the diagnostic. `&&` stops the combined command after a failing file scan.
[Gitleaks usage](https://github.com/gitleaks/gitleaks/tree/v8.30.1#usage)

## Verbose output and observed recovery

To pass `--verbose` to Gitleaks itself, use the leaf script:

```bash
npm run scan:secrets:files -- --verbose
printf 'secret scan exit: %s\n' "$?"
```

Keep `printf` immediately after the scan: `$?` is the previous command's status.
With `npm run scan:secrets -- --verbose`, the extra argument is appended to the
last nested command, `npm run scan:secrets:history`. That npm process interprets
it as npm logging verbosity; it does not make the earlier Gitleaks scan verbose.

On 2026-09-10, the user's output showed one finding with exit 1, then both file
and history scans reported no leaks after cleanup, with combined exit 0. Their
output did not name the rule because the verbose flag reached the composite
script. A separate assistant check in a disposable fixture verified `github-pat`
and redaction. Do not store the full synthetic token in these scanned notes or
commit a probe. These runs demonstrate detection and recovery, not learner mastery.

Semgrep's direct-eval finding/removal and separate numeric exit checks are recorded
in [implementation-plan.md](implementation-plan.md). A successful analysis message
can coexist with a finding and a failing exit status. Neither scanner demonstration
marks the roadmap project shipped.
