#!/bin/sh
set -e
echo "Entrypoint"

until [ "$(curl -fs -o /dev/null -w '%{http_code}' 'http://rqlite:4001/readyz')" -eq 200 ]; do
  echo "Waiting for rqlite..."
  sleep 2
done

echo "Running migrations..."
npx knex migrate:latest --env development

echo "Running auth service..."
npm start
