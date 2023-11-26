FROM node:16-alpine

WORKDIR D:\weather-app\react-app

COPY package.json package-lock.json./

RUN npm install

COPY . ./

EXPOSE 3000