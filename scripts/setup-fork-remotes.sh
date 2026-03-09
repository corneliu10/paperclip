#!/usr/bin/env bash
set -euo pipefail

fork_url="${1:-}"
upstream_url="${2:-git@github.com:paperclipai/paperclip.git}"

if [[ -z "$fork_url" ]]; then
  echo "Usage: $0 <fork-url> [upstream-url]" >&2
  exit 1
fi

if git remote get-url origin >/dev/null 2>&1; then
  current_origin="$(git remote get-url origin)"
  if [[ "$current_origin" != "$fork_url" ]]; then
    if git remote get-url upstream >/dev/null 2>&1; then
      git remote set-url origin "$fork_url"
    else
      git remote rename origin upstream
      git remote add origin "$fork_url"
    fi
  fi
else
  git remote add origin "$fork_url"
fi

if ! git remote get-url upstream >/dev/null 2>&1; then
  git remote add upstream "$upstream_url"
fi

git remote -v
