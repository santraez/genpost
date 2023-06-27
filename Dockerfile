FROM node:18.16.1-alpine

WORKDIR /home

COPY package.json .

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
