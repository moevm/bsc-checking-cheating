FROM node:lts

ENV ROOT=/app/antiplagiat

RUN npm install yarn

RUN mkdir -p ${ROOT}
WORKDIR ${ROOT}

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]