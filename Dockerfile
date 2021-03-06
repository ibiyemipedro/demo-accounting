FROM node:14-slim

RUN apt-get update && apt-get install make

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./ /usr/src/app

EXPOSE 8000

CMD [ "node", "index.js" ]
