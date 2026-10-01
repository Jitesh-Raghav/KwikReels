#!/usr/bin/env bash
# Vercel build entrypoint (wired up in vercel.json).
#
# Production deployments push the Convex functions and build the app against the
# production deployment, exactly like `npx convex deploy --cmd 'npm run build'`.
#
# Preview deployments must not push functions from a feature branch to the
# production Convex deployment (Convex refuses to with a production deploy key).
# They only build the frontend, pointed at an existing deployment: either
# NEXT_PUBLIC_CONVEX_URL if it is set for the Preview environment, or the
# production deployment named in CONVEX_DEPLOY_KEY.
set -euo pipefail

if [ "${VERCEL_ENV:-production}" = "production" ]; then
  exec npx convex deploy --cmd 'npm run build'
fi

# A Preview deploy key creates a fresh Convex preview deployment per branch.
if [[ "${CONVEX_DEPLOY_KEY:-}" == preview:* ]]; then
  exec npx convex deploy --cmd 'npm run build'
fi

if [ -z "${NEXT_PUBLIC_CONVEX_URL:-}" ]; then
  # Production deploy keys look like "prod:<deployment-name>|<secret>"
  deploy_key="${CONVEX_DEPLOY_KEY:-}"
  key_prefix="${deploy_key%%|*}"
  deployment="${key_prefix#prod:}"
  if [ -z "$deploy_key" ] || [ "$deployment" = "$key_prefix" ] || [ -z "$deployment" ]; then
    echo "NEXT_PUBLIC_CONVEX_URL is not set and no production CONVEX_DEPLOY_KEY is available." >&2
    echo "Set NEXT_PUBLIC_CONVEX_URL for the ${VERCEL_ENV} environment in Vercel." >&2
    exit 1
  fi
  export NEXT_PUBLIC_CONVEX_URL="https://${deployment}.convex.cloud"
fi

echo "Preview build (${VERCEL_ENV}): skipping Convex deploy, using ${NEXT_PUBLIC_CONVEX_URL}"
exec npm run build
