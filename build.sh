#! /bin/bash

echo $(cat /nginx-base.conf) | envsubst > /etc/nginx/conf.d/default.conf