FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./
ENV mongoURL "mongodb://mongo:27017/todos"
ENV PORT 8080
RUN npm install

COPY . .

CMD [ "npm", "start" ]