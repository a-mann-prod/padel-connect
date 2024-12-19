build:
		docker compose -f docker/docker-compose.$(env).yml up --build -d --remove-orphans

start:
		docker compose -f docker/docker-compose.$(env).yml up -d

stop:
		docker compose -f docker/docker-compose.$(env).yml down

logs:
		docker compose -f docker/docker-compose.$(env).yml logs

migrations:
		docker exec -it api sh -c "python manage.py makemigrations && python manage.py migrate"

superuser:
		docker exec -it api sh -c "python manage.py createsuperuser"

freeze:
		pip freeze > requirements.txt

translations:
		docker exec -it api sh -c "python manage.py makemessages -l fr && python manage.py makemessages -l en"

compile-translations:
		docker exec -it api sh -c "python manage.py compilemessages"