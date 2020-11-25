FROM mhart/alpine-node:11

RUN yarn global add serve

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

CMD serve -s /app/build