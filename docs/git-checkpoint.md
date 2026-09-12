# Save this checkpoint to GitHub

The user performs staging, committing, and pushing. The assistant reviews and
explains the commands; it does not execute them on the user's behalf.

At preparation on 2026-09-10, local `main` and GitHub's `main` both pointed to
`cc19d934550150b3ec7f15f62b84130933eb98f8`. The remote is
`https://github.com/avidabhay/ship-kit.git`. This is a snapshot, not proof of a
later commit or push. A push saves the checkpoint; it does not deploy or ship it.

## Follow-up — 2026-09-12

The original checkpoint was confirmed pushed at `56764b8`. The commands below
remain an explanation of that earlier snapshot. Current work includes the new
`.github/workflows/ci.yml` and `.zed/settings.json`, which the original `git add`
list does not include. Inspect all current changes and review an updated explicit
staging list before the next commit. The assistant still does not stage, commit,
or push. See the [current checkpoint](checkpoint-2026-09-12.md).

## 1. Review and stage

From the repository root:

```bash
git status --short
git diff --stat
git add -- .gitignore .gitleaks.toml .semgrep.yml biome.json package.json tsconfig.json src/example.ts README.md docs
git diff --cached --stat
git diff --cached --check
git diff --cached
```

`git add` places the selected files' current contents in the staging area for
the next commit. `git diff --cached` shows exactly that proposed snapshot,
including new files. Press `q` to leave the diff viewer. If you edit a staged
file again, add it again to include the new edit.

Expect configuration, source formatting, README, and documentation. The removed
synthetic probe should be absent. Generated output and `today.txt` stay ignored;
the versioned handoff supplies shared continuity. Keep `package-lock.json` in Git;
it is already tracked and has no change at this checkpoint.

## 2. Commit the reviewed snapshot

```bash
git commit -m "feat: add local quality and security checks"
git show --stat --oneline HEAD
git status --short
```

A commit records the staged snapshot locally with a message. This is distinct
from uploading it. Successful local cleanup should leave no uncommitted project
changes; ignored files do not appear in ordinary `git status`.

## 3. Push and inspect

```bash
git push origin main
git status -sb
```

`origin` names the GitHub remote; `main` names the branch being uploaded.
The branch already tracks `origin/main`, so a new upstream setting is unnecessary.
After success, open the repository on GitHub and check that the new commit and
scanner configuration files are visible. Paste the command output for review
if any step fails. No push has been verified merely by saving this guide.

## Primary references

- [git add](https://git-scm.com/docs/git-add)
- [git diff](https://git-scm.com/docs/git-diff)
- [git commit](https://git-scm.com/docs/git-commit)
- [git push](https://git-scm.com/docs/git-push)
