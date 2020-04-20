FROM node:latest

WORKDIR /app

COPY package.json /app
RUN yarn

COPY . /app

RUN yarn build

ENTRYPOINT ["yarn"]
CMD ["start"]
