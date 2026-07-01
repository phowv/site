#!/bin/sh
set -eu

if [ ! -f /configured ]; then
  if [ -z "${DOMAIN_NAME:-}" ]; then
  	echo "ERROR: DOMAIN_NAME is not set" >&2
   	exit 1
  fi

  echo "$(cat /nginx-base.conf)" | envsubst '${DOMAIN_NAME}' > /etc/nginx/conf.d/default.conf
  echo "YES" > /configured
fi

exec nginx -g 'daemon off;'