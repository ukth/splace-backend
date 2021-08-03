FROM node:14-alpine

LABEL MAINTAINER ukth <ukth@lunen.co.kr>

ENV NODE_ENV=production
WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*"] , "./"

COPY . .

RUN npm install --production --silent
# RUN npx prisma generate
# EXPOSE 3000
CMD ["npm", "start"]
