---
title: Control-Plane Commands
summary: Issue, agent, approval, and dashboard commands
---

Client-side commands for managing issues, agents, approvals, and more.

## Issue Commands

```sh
# List issues
pnpm birdai issue list [--status todo,in_progress] [--assignee-agent-id <id>] [--match text]

# Get issue details
pnpm birdai issue get <issue-id-or-identifier>

# Create issue
pnpm birdai issue create --title "..." [--description "..."] [--status todo] [--priority high]

# Update issue
pnpm birdai issue update <issue-id> [--status in_progress] [--comment "..."]

# Add comment
pnpm birdai issue comment <issue-id> --body "..." [--reopen]

# Checkout task
pnpm birdai issue checkout <issue-id> --agent-id <agent-id>

# Release task
pnpm birdai issue release <issue-id>
```

## Company Commands

```sh
pnpm birdai company list
pnpm birdai company get <company-id>

# Export to portable folder package (writes manifest + markdown files)
pnpm birdai company export <company-id> --out ./exports/acme --include company,agents

# Preview import (no writes)
pnpm birdai company import \
  --from https://github.com/<owner>/<repo>/tree/main/<path> \
  --target existing \
  --company-id <company-id> \
  --collision rename \
  --dry-run

# Apply import
pnpm birdai company import \
  --from ./exports/acme \
  --target new \
  --new-company-name "Acme Imported" \
  --include company,agents
```

## Agent Commands

```sh
pnpm birdai agent list
pnpm birdai agent get <agent-id>
```

## Approval Commands

```sh
# List approvals
pnpm birdai approval list [--status pending]

# Get approval
pnpm birdai approval get <approval-id>

# Create approval
pnpm birdai approval create --type hire_agent --payload '{"name":"..."}' [--issue-ids <id1,id2>]

# Approve
pnpm birdai approval approve <approval-id> [--decision-note "..."]

# Reject
pnpm birdai approval reject <approval-id> [--decision-note "..."]

# Request revision
pnpm birdai approval request-revision <approval-id> [--decision-note "..."]

# Resubmit
pnpm birdai approval resubmit <approval-id> [--payload '{"..."}']

# Comment
pnpm birdai approval comment <approval-id> --body "..."
```

## Activity Commands

```sh
pnpm birdai activity list [--agent-id <id>] [--entity-type issue] [--entity-id <id>]
```

## Dashboard

```sh
pnpm birdai dashboard get
```

## Heartbeat

```sh
pnpm birdai heartbeat run --agent-id <agent-id> [--api-base http://localhost:3100]
```
