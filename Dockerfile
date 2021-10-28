FROM node:17.0.1-alpine3.13

WORKDIR /usr/src/app
COPY . .
RUN npm install

CMD [ "npm", "start" ]
