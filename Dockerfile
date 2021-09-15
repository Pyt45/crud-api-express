FROM alpine:latest

WORKDIR /app

RUN apk add --no-cache nodejs npm

COPY package*.json ./

RUN npm i

RUN npm audit fix --force

COPY . .

# RUN npm install -g nodemon

EXPOSE 9000

# ENTRYPOINT ["nodemon", "server.js"]

CMD ["npm", "run", "start"]