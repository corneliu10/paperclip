---
title: Local Development
summary: Set up BirdAI for local development
---

Run BirdAI locally with zero external dependencies.

## Prerequisites

- Node.js 20+
- pnpm 9+

## Start Dev Server

```sh
pnpm install
pnpm dev
```

This starts:

- **API server** at `http://localhost:3100`
- **UI** served by the API server in dev middleware mode (same origin)

No Docker or external database required. BirdAI uses embedded PostgreSQL automatically.

## One-Command Bootstrap

For a first-time install:

```sh
pnpm birdai run
```

This does:

1. Auto-onboards if config is missing
2. Runs `birdai doctor` with repair enabled
3. Starts the server when checks pass

## Tailscale/Private Auth Dev Mode

To run in `authenticated/private` mode for network access:

```sh
pnpm dev --tailscale-auth
```

This binds the server to `0.0.0.0` for private-network access.

Alias:

```sh
pnpm dev --authenticated-private
```

Allow additional private hostnames:

```sh
pnpm birdai allowed-hostname dotta-macbook-pro
```

For full setup and troubleshooting, see [Tailscale Private Access](/deploy/tailscale-private-access).

## Health Checks

```sh
curl http://localhost:3100/api/health
# -> {"status":"ok"}

curl http://localhost:3100/api/companies
# -> []
```

## Reset Dev Data

To wipe local data and start fresh:

```sh
rm -rf ~/.birdai/instances/default/db
pnpm dev
```

## Data Locations

| Data | Path |
|------|------|
| Config | `~/.birdai/instances/default/config.json` |
| Database | `~/.birdai/instances/default/db` |
| Storage | `~/.birdai/instances/default/data/storage` |
| Secrets key | `~/.birdai/instances/default/secrets/master.key` |
| Logs | `~/.birdai/instances/default/logs` |

Override with environment variables:

```sh
BIRDAI_HOME=/custom/path BIRDAI_INSTANCE_ID=dev pnpm birdai run
```
