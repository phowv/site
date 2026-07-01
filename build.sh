#!/bin/sh
set -eu

if [ ! -f /etc/nginx/conf.d/default.conf ]; then
	if [ -z "${DOMAIN_NAME:-}" ]; then
		echo "ERROR: DOMAIN_NAME is not set" >&2
		exit 1
	fi

  echo "$(cat /nginx-base.conf)" | envsubst > /etc/nginx/conf.d/default.conf
fi

exec nginx -g 'daemon off;'