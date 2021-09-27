FROM ubuntu:latest
USER root

LABEL MAINTAINER maknae <maknae@lunen.co.kr>

#ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./

RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_14.x  | bash -
RUN apt-get -y install nodejs
RUN npm install --silent

COPY . .

#RUN npx prisma generate
#EXPOSE 4000
#CMD ["npm", "start"]
