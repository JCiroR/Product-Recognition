FROM node:10

WORKDIR ./node-server

COPY . ./

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]