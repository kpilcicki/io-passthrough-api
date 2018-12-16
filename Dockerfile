FROM node:10-alpine as Base

RUN apk add git python make gcc g++ bash

RUN apk add nano

WORKDIR /app
COPY . .

RUN npm install; \
    npm build; 

EXPOSE 3010

CMD [ "npm start" ]

