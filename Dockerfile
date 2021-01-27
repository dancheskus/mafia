# for production only
FROM mhart/alpine-node:latest
WORKDIR /app
COPY . .
RUN yarn global add serve && yarn && yarn build