FROM node:10 as Base

RUN apt-get update
RUN apt-get install git python make gcc g++ bash

# RUN apk add --no-cache --virtual .gyp \
#         python \
#         make \
#         g++ \
#     && npm install \
#     && apk del .gyp

WORKDIR /app
COPY . .

RUN npm install;
RUN npm run build; 

EXPOSE 3010

CMD [ "npm", "run", "start" ]