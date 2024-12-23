ARG PYTHON_VERSION

# pull the official docker image
FROM python:$PYTHON_VERSION

# set env variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# set work directory
WORKDIR /app

# install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

RUN apt-get update && \
    apt-get install -y --no-install-recommends netcat

# copy project
COPY ./backend ./backend
COPY ./chat ./chat
COPY ./main_app ./main_app
COPY ./locale ./locale
COPY ./manage.py ./manage.py
COPY docker/entrypoint.sh /docker/entrypoint.sh

RUN chmod +x /docker/entrypoint.sh

ENTRYPOINT ["/docker/entrypoint.sh"]