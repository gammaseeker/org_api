# Using node image alpine version
FROM node:14.15.5-alpine

RUN mkdir /backend
WORKDIR /backend
EXPOSE 3001
COPY package.json /backend
RUN npm install
COPY . /backend
CMD ["npm", "start"]