FROM node:12.13.0

RUN apt-get update && apt-get install -y netcat

WORKDIR /app
COPY ["package.json", "yarn.lock", "Makefile", "./"]
RUN make iniciar 
COPY . .
