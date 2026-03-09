---
title: CLI Overview
summary: CLI installation and setup
---

The BirdAI CLI handles instance setup, diagnostics, and control-plane operations.

## Usage

```sh
pnpm birdai --help
```

## Global Options

All commands support:

| Flag | Description |
|------|-------------|
| `--data-dir <path>` | Local BirdAI data root (isolates from `~/.birdai`) |
| `--api-base <url>` | API base URL |
| `--api-key <token>` | API authentication token |
| `--context <path>` | Context file path |
| `--profile <name>` | Context profile name |
| `--json` | Output as JSON |

Company-scoped commands also accept `--company-id <id>`.

For clean local instances, pass `--data-dir` on the command you run:

```sh
pnpm birdai run --data-dir ./tmp/birdai-dev
```

## Context Profiles

Store defaults to avoid repeating flags:

```sh
# Set defaults
pnpm birdai context set --api-base http://localhost:3100 --company-id <id>

# View current context
pnpm birdai context show

# List profiles
pnpm birdai context list

# Switch profile
pnpm birdai context use default
```

To avoid storing secrets in context, use an env var:

```sh
pnpm birdai context set --api-key-env-var-name BIRDAI_API_KEY
export BIRDAI_API_KEY=...
```

Context is stored at `~/.birdai/context.json`.

## Command Categories

The CLI has two categories:

1. **[Setup commands](/cli/setup-commands)** — instance bootstrap, diagnostics, configuration
2. **[Control-plane commands](/cli/control-plane-commands)** — issues, agents, approvals, activity
