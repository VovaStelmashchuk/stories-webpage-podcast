FROM node:20-alpine

WORKDIR /app
COPY . /app

RUN npm ci
RUN nuxt build
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]