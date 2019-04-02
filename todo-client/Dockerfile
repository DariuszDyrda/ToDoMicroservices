FROM node:carbon as builder

WORKDIR /usr/src/app

COPY package*.json ./
ENV PORT 3000
RUN npm install

COPY . .

RUN npm run build
FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html