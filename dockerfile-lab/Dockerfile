FROM nginx:latest

RUN apt-get update && apt-get install -y \
    nano

COPY src /usr/share/nginx/html

EXPOSE 80