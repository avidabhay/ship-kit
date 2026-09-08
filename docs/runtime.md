# Reproducible runtime setup

Verified on 2026-09-09. This project uses **Node 24.20.0** and its bundled
**npm 11.19.0**, managed locally with **nvm 0.40.7**.

The previous terminal selected an older system Node while the editor supplied
another version. A temporary editor PATH change fixed one session. The setup
below selects the project runtime independently of the editor.

## Every work session

In a terminal with nvm loaded, from the repository root:

```bash
nvm use
node --version
npm --version
```

Expected: `v24.20.0` and `11.19.0`. The version comes from `.nvmrc`.
Entering the directory alone does not automatically run `nvm use`.

## First setup on a machine

If nvm is already installed, proceed to the project installation commands.
For a new nvm installation on Bash/Linux:

```bash
git clone --depth 1 --branch v0.40.7 https://github.com/nvm-sh/nvm.git "$HOME/.nvm"
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh" --no-use
```

Add these lines to `~/.bashrc` so future interactive Bash terminals load nvm:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
```

From the repository root:

```bash
nvm install
nvm use
npm ci
npm run typecheck
npm test
npm run coverage
```

nvm installs the official Node archive and verifies its published checksum.
Use the npm bundled with this Node installation; a separate global npm upgrade
would no longer match the project's pin.

## How the files work together

| File | Purpose |
| --- | --- |
| `.nvmrc` | Selects the exact Node version for `nvm install` / `nvm use`. |
| `package.json` → `engines` | Declares the exact Node and npm requirements. |
| `.npmrc` → `engine-strict=true` | Rejects dependency installation with incompatible engines. |
| `package-lock.json` | Records the resolved dependency tree for `npm ci`. |

The install guard does not select Node or enforce the runtime of every script.
Run `nvm use` before work. Exact runtime requirements make upgrades deliberate:
update `.nvmrc`, both engine fields, the lockfile metadata, and these instructions
together after checking primary sources and rerunning the checks.

## Local changes and verification

- Installed nvm at `~/.nvm` from its verified release tag and commit
  `f0b0c6bb0b281ceeb106c8cf9ab8fde141215092`.
- Installed the pinned Node and bundled npm. nvm created the default alias for
  this first installation.
- Backed up `~/.bashrc` to `~/.bashrc.ship-kit-backup-2026-09-09`, then appended
  nvm initialization. These home-directory changes are local, not Git artifacts.
- A fresh interactive Bash loaded nvm and selected the pinned Node/npm.
- `npm ci`, typecheck, tests, and coverage passed under the pinned runtime.
- A disposable package using this repository's engine requirements and npm
  settings rejected the older system Node with `EBADENGINE`.
- No setup duration or deployment result was measured.

## Primary sources

Checked on 2026-09-09:

- [Node release artifacts](https://nodejs.org/dist/v24.20.0/) and
  [checksums](https://nodejs.org/dist/v24.20.0/SHASUMS256.txt).
- [Bundled npm manifest](https://github.com/nodejs/node/blob/v24.20.0/deps/npm/package.json).
- [nvm release](https://github.com/nvm-sh/nvm/releases/tag/v0.40.7),
  [Git installation](https://github.com/nvm-sh/nvm/blob/v0.40.7/README.md#git-install),
  and [.nvmrc usage](https://github.com/nvm-sh/nvm/blob/v0.40.7/README.md#nvmrc).
- [npm engine enforcement](https://docs.npmjs.com/cli/v11/using-npm/config/#engine-strict).
