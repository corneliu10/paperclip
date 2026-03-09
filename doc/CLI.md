# CLI Reference

BirdAI CLI now supports both:

- instance setup/diagnostics (`onboard`, `doctor`, `configure`, `env`, `allowed-hostname`)
- control-plane client operations (issues, approvals, agents, activity, dashboard)

## Base Usage

Use repo script in development:

```sh
pnpm birdai --help
```

First-time local bootstrap + run:

```sh
pnpm birdai run
```

Choose local instance:

```sh
pnpm birdai run --instance dev
```

## Deployment Modes

Mode taxonomy and design intent are documented in `doc/DEPLOYMENT-MODES.md`.

Current CLI behavior:

- `birdai onboard` and `birdai configure --section server` set deployment mode in config
- runtime can override mode with `BIRDAI_DEPLOYMENT_MODE`
- `birdai run` and `birdai doctor` do not yet expose a direct `--mode` flag

Target behavior (planned) is documented in `doc/DEPLOYMENT-MODES.md` section 5.

Allow an authenticated/private hostname (for example custom Tailscale DNS):

```sh
pnpm birdai allowed-hostname dotta-macbook-pro
```

All client commands support:

- `--data-dir <path>`
- `--api-base <url>`
- `--api-key <token>`
- `--context <path>`
- `--profile <name>`
- `--json`

Company-scoped commands also support `--company-id <id>`.

Use `--data-dir` on any CLI command to isolate all default local state (config/context/db/logs/storage/secrets) away from `~/.birdai`:

```sh
pnpm birdai run --data-dir ./tmp/birdai-dev
pnpm birdai issue list --data-dir ./tmp/birdai-dev
```

## Context Profiles

Store local defaults in `~/.birdai/context.json`:

```sh
pnpm birdai context set --api-base http://localhost:3100 --company-id <company-id>
pnpm birdai context show
pnpm birdai context list
pnpm birdai context use default
```

To avoid storing secrets in context, set `apiKeyEnvVarName` and keep the key in env:

```sh
pnpm birdai context set --api-key-env-var-name BIRDAI_API_KEY
export BIRDAI_API_KEY=...
```

## Company Commands

```sh
pnpm birdai company list
pnpm birdai company get <company-id>
pnpm birdai company delete <company-id-or-prefix> --yes --confirm <same-id-or-prefix>
```

Examples:

```sh
pnpm birdai company delete PAP --yes --confirm PAP
pnpm birdai company delete 5cbe79ee-acb3-4597-896e-7662742593cd --yes --confirm 5cbe79ee-acb3-4597-896e-7662742593cd
```

Notes:

- Deletion is server-gated by `BIRDAI_ENABLE_COMPANY_DELETION`.
- With agent authentication, company deletion is company-scoped. Use the current company ID/prefix (for example via `--company-id` or `BIRDAI_COMPANY_ID`), not another company.

## Issue Commands

```sh
pnpm birdai issue list --company-id <company-id> [--status todo,in_progress] [--assignee-agent-id <agent-id>] [--match text]
pnpm birdai issue get <issue-id-or-identifier>
pnpm birdai issue create --company-id <company-id> --title "..." [--description "..."] [--status todo] [--priority high]
pnpm birdai issue update <issue-id> [--status in_progress] [--comment "..."]
pnpm birdai issue comment <issue-id> --body "..." [--reopen]
pnpm birdai issue checkout <issue-id> --agent-id <agent-id> [--expected-statuses todo,backlog,blocked]
pnpm birdai issue release <issue-id>
```

## Agent Commands

```sh
pnpm birdai agent list --company-id <company-id>
pnpm birdai agent get <agent-id>
pnpm birdai agent local-cli <agent-id-or-shortname> --company-id <company-id>
```

`agent local-cli` is the quickest way to run local Claude/Codex manually as a BirdAI agent:

- creates a new long-lived agent API key
- installs missing BirdAI skills into `~/.codex/skills` and `~/.claude/skills`
- prints `export ...` lines for `BIRDAI_API_URL`, `BIRDAI_COMPANY_ID`, `BIRDAI_AGENT_ID`, and `BIRDAI_API_KEY`

Example for shortname-based local setup:

```sh
pnpm birdai agent local-cli codexcoder --company-id <company-id>
pnpm birdai agent local-cli claudecoder --company-id <company-id>
```

## Approval Commands

```sh
pnpm birdai approval list --company-id <company-id> [--status pending]
pnpm birdai approval get <approval-id>
pnpm birdai approval create --company-id <company-id> --type hire_agent --payload '{"name":"..."}' [--issue-ids <id1,id2>]
pnpm birdai approval approve <approval-id> [--decision-note "..."]
pnpm birdai approval reject <approval-id> [--decision-note "..."]
pnpm birdai approval request-revision <approval-id> [--decision-note "..."]
pnpm birdai approval resubmit <approval-id> [--payload '{"...":"..."}']
pnpm birdai approval comment <approval-id> --body "..."
```

## Activity Commands

```sh
pnpm birdai activity list --company-id <company-id> [--agent-id <agent-id>] [--entity-type issue] [--entity-id <id>]
```

## Dashboard Commands

```sh
pnpm birdai dashboard get --company-id <company-id>
```

## Heartbeat Command

`heartbeat run` now also supports context/api-key options and uses the shared client stack:

```sh
pnpm birdai heartbeat run --agent-id <agent-id> [--api-base http://localhost:3100] [--api-key <token>]
```

## Local Storage Defaults

Default local instance root is `~/.birdai/instances/default`:

- config: `~/.birdai/instances/default/config.json`
- embedded db: `~/.birdai/instances/default/db`
- logs: `~/.birdai/instances/default/logs`
- storage: `~/.birdai/instances/default/data/storage`
- secrets key: `~/.birdai/instances/default/secrets/master.key`

Override base home or instance with env vars:

```sh
BIRDAI_HOME=/custom/home BIRDAI_INSTANCE_ID=dev pnpm birdai run
```

## Storage Configuration

Configure storage provider and settings:

```sh
pnpm birdai configure --section storage
```

Supported providers:

- `local_disk` (default; local single-user installs)
- `s3` (S3-compatible object storage)
