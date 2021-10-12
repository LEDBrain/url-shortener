FROM node:16.11.0-alpine3.13

WORKDIR /usr/src/app
COPY . .
RUN npm install

CMD [ "npm", "start" ]
