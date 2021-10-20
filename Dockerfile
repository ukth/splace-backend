FROM ubuntu:latest
USER root

LABEL MAINTAINER maknae <maknae@lunen.co.kr>

WORKDIR /app

COPY package*.json ./

RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_14.x  | bash -
RUN apt-get -y install nodejs
RUN npm install --silent

COPY . .

RUN npm run build
RUN npx prisma generate


FROM ubuntu:latest
USER root

LABEL MAINTAINER maknae <maknae@lunen.co.kr>

ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./

RUN apt-get update 
RUN apt-get -y install curl gnupg 
RUN curl -sL https://deb.nodesource.com/setup_14.x  | bash -
RUN apt-get -y install nodejs
RUN npm install --silent


COPY --from=0 /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=0 /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=0 /app/build ./build
COPY --from=0 /app/.env .

EXPOSE 4000
CMD ["npm", "start"]
