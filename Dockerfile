FROM node:20-alpine

WORKDIR /usr/src/auth

COPY package*.json ./

RUN apk --no-cache add curl
RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["/usr/src/auth/entry.sh"]
