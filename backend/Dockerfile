# Offizielles Image pullen
FROM python:3.11.4-slim-buster

# Workdir setzen
WORKDIR /usr/src/app

# Envvars setzen
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install system deps
RUN apt-get update && apt-get install -y netcat

# Dependencies installieren
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy entrypoint
COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# Projekt kopieren
COPY . .

# run entrypoint.sh
ENTRYPOINT [ "sh","/usr/src/app/entrypoint.sh" ]