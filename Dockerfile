FROM node:12.13.0

WORKDIR /app
COPY ["package.json", "yarn.lock", "Makefile", "./"]
RUN make iniciar 
COPY . .
