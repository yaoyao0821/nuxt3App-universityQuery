FROM node:18.14.2-slim as builder
RUN mkdir -p /var/www/nuxt
WORKDIR /var/www/nuxt
COPY package*.json ./ 
RUN yarn install
COPY . .
RUN yarn build

FROM node:18.14.2-slim
EXPOSE 4000

ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=4000

RUN mkdir -p /var/www/nuxt
WORKDIR /var/www/nuxt
COPY --from=Builder /var/www/nuxt/.output /var/www/nuxt
CMD [ "node", "./server/index.mjs" ]
