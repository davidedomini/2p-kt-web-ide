#FROM alpine:latest

#RUN apk update
#RUN apk add nodejs
#RUN apk add npm
#RUN apk add openjdk11

#COPY ./ $HOME/backend
#WORKDIR $HOME/backend
#RUN cd service-2pkt && ./gradlew build & 
#RUN cd ..
#RUN npm install
#CMD node index.js


FROM node:18

# Create app directory
WORKDIR $HOME/backend

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

#Clean cache
RUN rm -rf node_modules
RUN npm cache clean --force

RUN npm install
RUN npm install bcrypt
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]