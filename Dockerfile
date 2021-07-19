FROM node:14.17-alpine3.12 
WORKDIR /usr/app
COPY package*.json ./
RUN npm install  
COPY . .
EXPOSE 4000
CMD [ "npm", "run", "start:dev" ] 