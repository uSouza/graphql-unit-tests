FROM node:latest

WORKDIR /usr/src/app

EXPOSE 8080

CMD [ "npm", "run", "start-dev" ]
