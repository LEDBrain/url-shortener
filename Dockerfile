FROM node:16.11.1-alpine3.13

WORKDIR /usr/src/app
COPY . .
RUN npm install

CMD [ "npm", "start" ]
