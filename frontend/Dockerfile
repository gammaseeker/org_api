# Using node image alpine version
FROM node:14.15.5-alpine

RUN mkdir /frontend
WORKDIR /frontend
EXPOSE 3000
COPY package.json /frontend
RUN npm install
COPY . /frontend
CMD ["npm", "start"]