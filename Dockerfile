FROM node:9

WORKDIR /server

COPY package.json /app
RUN yarn install
COPY . /server

CMD node server.js

EXPOSE 8080

