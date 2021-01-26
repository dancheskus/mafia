FROM mhart/alpine-node:latest AS dev
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
CMD yarn start:react

FROM mhart/alpine-node:latest AS prod
RUN yarn global add serve
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build
CMD serve -s /app/build