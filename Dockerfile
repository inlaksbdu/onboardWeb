FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8025

CMD ["npm", "run", "dev", "--", "--host"]