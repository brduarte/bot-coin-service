FROM node:14.15.4

WORKDIR /project

ADD . .
RUN yarn install
EXPOSE 3333
CMD [ "yarn", "dev"]