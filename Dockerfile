FROM node:14.16.0-alpine3.10

WORKDIR /devschools

COPY ./package.json .

RUN yarn

CMD ["yarn", "dev"]
