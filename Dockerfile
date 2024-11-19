FROM node:20.10-alpine

WORKDIR /app-backend

COPY package* .

RUN npm install

COPY . .

CMD ["npx", "nodemon", "--legacy-watch", "--config", "nodemon.json"]