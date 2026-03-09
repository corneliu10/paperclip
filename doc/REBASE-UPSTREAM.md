# Fork + Upstream Rebase Workflow

Use this workflow when you keep custom changes in your own fork but still want to stay current with the upstream open-source repo.

## One-Time Setup

If this clone still points `origin` at the open-source repo, rewire it so your fork is the writable remote:

```sh
./scripts/setup-fork-remotes.sh https://github.com/<you>/paperclip.git
```

Expected result:

- `origin` points to your fork
- `upstream` points to the open-source repo

## Daily Branch Contract

- `upstream/master` is the open-source source of truth
- `origin/master` is your custom integrated branch
- feature work branches from local `master`

## Safe Rebase Routine

Run this only from a clean working tree:

```sh
./scripts/rebase-upstream.sh
```

That script:

1. fetches `upstream` and `origin`
2. switches to `master`
3. fast-forwards local `master` to `origin/master`
4. rebases your branch onto `upstream/master`

After the rebase:

```sh
pnpm -r typecheck
pnpm test:run
pnpm build
git push --force-with-lease origin master
```

## Recovery

Before large rebases, create a snapshot branch from your current state:

```sh
git switch -c backup-pre-rebase-$(date +%F)
git add -A
git commit -m "chore: snapshot pre-rebase state"
git switch master
git merge --ff-only backup-pre-rebase-$(date +%F)
```
