FROM node:14.15.4

ARG APP_PORT=3333
ARG BASE_URL_API_POLONIEX='https://poloniex.com'
ARG TYPEORM_HOST=mysql
ARG TYPEORM_USERNAME=bitbot
ARG TYPEORM_PASSWORD=bitbot
ARG TYPEORM_DATABASE=bitbot
ARG TYPEORM_PORT=3309
ARG TYPEORM_LOGGING=false

WORKDIR /project

ADD . .
RUN npm install -g typescript
RUN yarn install

RUN echo APP_PORT=${APP_PORT} >> .env
RUN echo BASE_URL_API_POLONIEX=${BASE_URL_API_POLONIEX} >> .env
RUN echo TYPEORM_HOST=${TYPEORM_HOST} >> .env
RUN echo TYPEORM_USERNAME=${TYPEORM_USERNAME} >> .env
RUN echo TYPEORM_PASSWORD=${TYPEORM_PASSWORD} >> .env
RUN echo TYPEORM_DATABASE=${TYPEORM_DATABASE} >> .env
RUN echo TYPEORM_PORT=${TYPEORM_PORT} >> .env
RUN echo TYPEORM_LOGGING=${TYPEORM_LOGGING} >> .env

EXPOSE $APP_PORT
CMD yarn start