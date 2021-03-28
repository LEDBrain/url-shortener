FROM node:12.18-alpine

WORKDIR /usr/src/app
COPY . .
RUN npm install

CMD [ "npm", "start" ]
