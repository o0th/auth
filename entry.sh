#!/bin/sh
set -e
echo "Entrypoint"

until [ "$(curl -fs -o /dev/null -w '%{http_code}' 'http://rqlite:4001/readyz')" -eq 200 ]; do
  echo "Waiting for rqlite..."
  sleep 2
done

echo "Running migrations..."
npm run migration

echo "Running auth service..."
npm start
