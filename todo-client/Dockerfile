FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./
ENV PORT 3000
RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]