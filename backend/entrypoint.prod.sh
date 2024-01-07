#!/bin/sh

if [ "${DATABASE:-mysql}" = "mysql" ]; then
    echo "Waiting for MySQL at ${SQL_HOST:-db}:${SQL_PORT:-3306}..."

    while ! nc -z "${SQL_HOST:-db}" "${SQL_PORT:-3306}"; do
        echo "MySQL not available yet. Retrying in 1 second..."
        sleep 1
    done

    echo "MySQL is now available."
fi

echo "Executing command: $@"
exec "$@"