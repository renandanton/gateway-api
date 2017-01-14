FROM node:6.9.4
MAINTAINER TI Emotion Digital "ti@emotiondigital.com.br"

# update apt-get list and install
RUN apt-get update
RUN apt-get install -y vim nano

# Create app directory
RUN mkdir -p /usr/src/cgs-gateway
WORKDIR /usr/src/cgs-gateway

# Install app dependencies
COPY package.json /usr/src/cgs-gateway/
RUN npm install

COPY . /usr/src/cgs-gateway

CMD [ "npm", "start" ]
