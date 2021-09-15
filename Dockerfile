FROM alpine:latest

WORKDIR /app

RUN apk add --no-cache nodejs npm

COPY package*.json ./

RUN npm i

RUN npm audit fix --force

RUN COPY . .

# RUN npm install -g nodemon

EXPOSE 8080

# ENTRYPOINT ["nodemon", "server.js"]

CMD ["npm", "run", "start"]