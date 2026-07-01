#!/bin/sh
set -eu

if [ -z "${DOMAIN_NAME:-}" ]; then
	echo "ERROR: DOMAIN_NAME is not set" >&2
	exit 1
fi

echo "$(cat /nginx-base.conf)" | envsubst '${DOMAIN_NAME}' > /etc/nginx/conf.d/default.conf