# DigitalOcean VPS Deployment

This repo now includes a production-oriented Docker setup for deploying BirdAI to a single DigitalOcean Droplet while keeping PostgreSQL in DigitalOcean Managed PostgreSQL.

## Files

- `.env.production.example`: required runtime variables
- `docker-compose.prod.yml`: production app service
- `docker-compose.validation.yml`: temporary direct port `3100` exposure for IP-based validation
- `docker-compose.public.yml`: Caddy reverse proxy for final domain + HTTPS
- `.github/workflows/deploy-digitalocean.yml`: push-to-master CI/CD workflow

## Initial Validation On Droplet IP

1. Copy `.env.production.example` to `.env.production` and fill in:
   - `DATABASE_URL`
   - `BETTER_AUTH_SECRET`
   - `BIRDAI_PUBLIC_URL=http://<droplet-ip>:3100`
2. Start the app:

```sh
docker compose --env-file .env.production \
  -f docker-compose.prod.yml \
  -f docker-compose.validation.yml \
  up -d --build
```

3. Verify:

```sh
curl http://<droplet-ip>:3100/api/health
```

## Final Public HTTPS Setup

1. Point your domain at the Droplet.
2. Update `.env.production`:
   - `BIRDAI_PUBLIC_URL=https://<your-domain>`
   - `BIRDAI_DOMAIN=<your-domain>`
   - `ACME_EMAIL=<your-email>`
3. Start the public stack:

```sh
docker compose --env-file .env.production \
  -f docker-compose.prod.yml \
  -f docker-compose.public.yml \
  up -d --build
```

BirdAI stays private to the Docker network in this mode; Caddy is the only public listener.

## GitHub Actions Deploy

The workflow deploys on pushes to `master` after typecheck, tests, and build pass.

Required GitHub Actions secrets:

- `DEPLOY_HOST`
- `DEPLOY_USER`
- `DEPLOY_SSH_PRIVATE_KEY`
- `DEPLOY_SSH_KNOWN_HOSTS`
- `DEPLOY_APP_DIR`
- `DEPLOY_DATABASE_URL`
- `DEPLOY_BETTER_AUTH_SECRET`
- `DEPLOY_BIRDAI_PUBLIC_URL`

Optional secrets:

- `DEPLOY_COMPOSE_FILES`
  - default: `docker-compose.prod.yml:docker-compose.validation.yml`
  - final public example: `docker-compose.prod.yml:docker-compose.public.yml`
- `DEPLOY_BIRDAI_DOMAIN`
- `DEPLOY_ACME_EMAIL`
- `DEPLOY_OPENAI_API_KEY`
- `DEPLOY_ANTHROPIC_API_KEY`
- `DEPLOY_BIRDAI_PORT`
- `DEPLOY_DATA_DIR`
- `DEPLOY_CADDY_DATA_DIR`
- `DEPLOY_CADDY_CONFIG_DIR`
- `DEPLOY_EXPOSURE`

The VPS must already have:

- Docker Engine with the Compose plugin
- a git clone of this repo at `DEPLOY_APP_DIR`
- GitHub access configured for `git fetch origin`
