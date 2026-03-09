---
title: Environment Variables
summary: Full environment variable reference
---

All environment variables that BirdAI uses for server configuration.

## Server Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3100` | Server port |
| `HOST` | `127.0.0.1` | Server host binding |
| `DATABASE_URL` | (embedded) | PostgreSQL connection string |
| `BIRDAI_HOME` | `~/.birdai` | Base directory for all BirdAI data |
| `BIRDAI_INSTANCE_ID` | `default` | Instance identifier (for multiple local instances) |
| `BIRDAI_DEPLOYMENT_MODE` | `local_trusted` | Runtime mode override |

## Secrets

| Variable | Default | Description |
|----------|---------|-------------|
| `BIRDAI_SECRETS_MASTER_KEY` | (from file) | 32-byte encryption key (base64/hex/raw) |
| `BIRDAI_SECRETS_MASTER_KEY_FILE` | `~/.birdai/.../secrets/master.key` | Path to key file |
| `BIRDAI_SECRETS_STRICT_MODE` | `false` | Require secret refs for sensitive env vars |

## Agent Runtime (Injected into agent processes)

These are set automatically by the server when invoking agents:

| Variable | Description |
|----------|-------------|
| `BIRDAI_AGENT_ID` | Agent's unique ID |
| `BIRDAI_COMPANY_ID` | Company ID |
| `BIRDAI_API_URL` | BirdAI API base URL |
| `BIRDAI_API_KEY` | Short-lived JWT for API auth |
| `BIRDAI_RUN_ID` | Current heartbeat run ID |
| `BIRDAI_TASK_ID` | Issue that triggered this wake |
| `BIRDAI_WAKE_REASON` | Wake trigger reason |
| `BIRDAI_WAKE_COMMENT_ID` | Comment that triggered this wake |
| `BIRDAI_APPROVAL_ID` | Resolved approval ID |
| `BIRDAI_APPROVAL_STATUS` | Approval decision |
| `BIRDAI_LINKED_ISSUE_IDS` | Comma-separated linked issue IDs |

## LLM Provider Keys (for adapters)

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Anthropic API key (for Claude Local adapter) |
| `OPENAI_API_KEY` | OpenAI API key (for Codex Local adapter) |
