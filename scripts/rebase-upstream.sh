#!/usr/bin/env bash
set -euo pipefail

branch="${1:-master}"

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Working tree must be clean before rebasing onto upstream." >&2
  exit 1
fi

git fetch upstream origin
git switch "$branch"
git pull --ff-only origin "$branch"
git rebase "upstream/$branch"

cat <<EOF
Rebase complete.

Next:
  pnpm -r typecheck
  pnpm test:run
  pnpm build
  git push --force-with-lease origin $branch
EOF
