FROM node:12.18.2
MAINTAINER Hugo Ruscitti <hugoruscitti@gmail.com>

EXPOSE 4200 7020 7357
WORKDIR /myapp

run find ./
RUN npm install -g bower@1.8.8
RUN npm install -g ember-cli@3.8.2
RUN yarn install
CMD ["ember", "server"]
