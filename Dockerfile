FROM node:12-alpine
WORKDIR /stocks-6-sense-api
COPY . .
RUN yarn install
RUN yarn build
CMD ["node", "dist/server.js"]