FROM node:11-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install && npm cache clean --force
COPY . /usr/src/app

ENTRYPOINT [ "npm", "start" ]
