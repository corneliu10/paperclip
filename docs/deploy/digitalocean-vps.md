---
title: DigitalOcean VPS
summary: Deploy BirdAI to a Droplet with managed Postgres
---

Use this setup when you want BirdAI on a single DigitalOcean Droplet while keeping PostgreSQL in DigitalOcean Managed PostgreSQL.

## Files In This Repo

- `.env.production.example` for required runtime variables
- `docker-compose.prod.yml` for the production app service
- `docker-compose.validation.yml` for temporary direct port `3100` exposure
- `docker-compose.public.yml` for the final Caddy-based HTTPS setup
- `.github/workflows/deploy-digitalocean.yml` for push-to-master deploys

## 1. Prepare The Droplet

Install Docker Engine and the Compose plugin, then clone your fork of this repo onto the server.

Example target path:

```sh
/opt/birdai
```

The GitHub Actions workflow expects that path to already contain a working git clone.

## 2. Configure Production Environment

Copy the template:

```sh
cp .env.production.example .env.production
```

Fill in at least:

- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BIRDAI_PUBLIC_URL`

For initial IP validation, set:

```sh
BIRDAI_PUBLIC_URL=http://<droplet-ip>:3100
```

## 3. First Bring-Up On The Droplet IP

Use the validation overlay to expose BirdAI directly on port `3100`:

```sh
docker compose --env-file .env.production \
  -f docker-compose.prod.yml \
  -f docker-compose.validation.yml \
  up -d --build
```

Verify:

```sh
curl http://<droplet-ip>:3100/api/health
```

This phase is only for validation. It is not the steady-state public setup.

## 4. Final Public HTTPS Setup

After your domain points at the Droplet:

1. Set `BIRDAI_PUBLIC_URL=https://<your-domain>`
2. Set `BIRDAI_DOMAIN=<your-domain>`
3. Set `ACME_EMAIL=<your-email>`

Then run:

```sh
docker compose --env-file .env.production \
  -f docker-compose.prod.yml \
  -f docker-compose.public.yml \
  up -d --build
```

In this mode, BirdAI is only reachable inside the Docker network and Caddy handles public HTTP/HTTPS.

## 5. GitHub Actions Deploy

The included workflow verifies the repo and then deploys over SSH on pushes to `master`.

Required GitHub Actions secrets:

- `DEPLOY_HOST`
- `DEPLOY_USER`
- `DEPLOY_SSH_PRIVATE_KEY`
- `DEPLOY_SSH_KNOWN_HOSTS`
- `DEPLOY_APP_DIR`
- `DEPLOY_DATABASE_URL`
- `DEPLOY_BETTER_AUTH_SECRET`
- `DEPLOY_BIRDAI_PUBLIC_URL`

Optional GitHub Actions secrets:

- `DEPLOY_COMPOSE_FILES`
- `DEPLOY_BIRDAI_DOMAIN`
- `DEPLOY_ACME_EMAIL`
- `DEPLOY_OPENAI_API_KEY`
- `DEPLOY_ANTHROPIC_API_KEY`
- `DEPLOY_BIRDAI_PORT`
- `DEPLOY_DATA_DIR`
- `DEPLOY_CADDY_DATA_DIR`
- `DEPLOY_CADDY_CONFIG_DIR`
- `DEPLOY_EXPOSURE`

Recommended values for `DEPLOY_COMPOSE_FILES`:

- Initial validation: `docker-compose.prod.yml:docker-compose.validation.yml`
- Final public deployment: `docker-compose.prod.yml:docker-compose.public.yml`
