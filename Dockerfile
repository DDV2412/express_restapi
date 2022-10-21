FROM node:16

WORKDIR /

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]