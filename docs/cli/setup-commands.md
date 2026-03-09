---
title: Setup Commands
summary: Onboard, run, doctor, and configure
---

Instance setup and diagnostics commands.

## `birdai run`

One-command bootstrap and start:

```sh
pnpm birdai run
```

Does:

1. Auto-onboards if config is missing
2. Runs `birdai doctor` with repair enabled
3. Starts the server when checks pass

Choose a specific instance:

```sh
pnpm birdai run --instance dev
```

## `birdai onboard`

Interactive first-time setup:

```sh
pnpm birdai onboard
```

First prompt:

1. `Quickstart` (recommended): local defaults (embedded database, no LLM provider, local disk storage, default secrets)
2. `Advanced setup`: full interactive configuration

Start immediately after onboarding:

```sh
pnpm birdai onboard --run
```

Non-interactive defaults + immediate start (opens browser on server listen):

```sh
pnpm birdai onboard --yes
```

## `birdai doctor`

Health checks with optional auto-repair:

```sh
pnpm birdai doctor
pnpm birdai doctor --repair
```

Validates:

- Server configuration
- Database connectivity
- Secrets adapter configuration
- Storage configuration
- Missing key files

## `birdai configure`

Update configuration sections:

```sh
pnpm birdai configure --section server
pnpm birdai configure --section secrets
pnpm birdai configure --section storage
```

## `birdai env`

Show resolved environment configuration:

```sh
pnpm birdai env
```

## `birdai allowed-hostname`

Allow a private hostname for authenticated/private mode:

```sh
pnpm birdai allowed-hostname my-tailscale-host
```

## Local Storage Paths

| Data | Default Path |
|------|-------------|
| Config | `~/.birdai/instances/default/config.json` |
| Database | `~/.birdai/instances/default/db` |
| Logs | `~/.birdai/instances/default/logs` |
| Storage | `~/.birdai/instances/default/data/storage` |
| Secrets key | `~/.birdai/instances/default/secrets/master.key` |

Override with:

```sh
BIRDAI_HOME=/custom/home BIRDAI_INSTANCE_ID=dev pnpm birdai run
```

Or pass `--data-dir` directly on any command:

```sh
pnpm birdai run --data-dir ./tmp/birdai-dev
pnpm birdai doctor --data-dir ./tmp/birdai-dev
```
