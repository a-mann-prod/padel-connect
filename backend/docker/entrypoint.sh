#!/bin/sh

echo 'Waiting for postgres...'

while ! nc -z ${DB_HOST} ${DB_PORT}; do
    sleep 1
done

echo 'PostgreSQL started'

echo 'Running migrations...'
python manage.py migrate

echo 'Collecting static files...'
python manage.py collectstatic --no-input

python manage.py runserver 0.0.0.0:${API_PORT}