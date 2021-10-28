FROM node:latest

COPY .env .env

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 80

CMD [ "node", "app.js" ]