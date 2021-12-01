FROM node:16.13.0-alpine3.13

WORKDIR /usr/src/app
COPY . .
RUN npm install

CMD [ "npm", "start" ]
