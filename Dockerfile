FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install  

COPY . .

EXPOSE 8025  

CMD ["sh", "-c", "npm run dev -- --host 0.0.0.0 --port 8025"]
