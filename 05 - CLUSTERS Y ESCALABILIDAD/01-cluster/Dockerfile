FROM node:22.16.0
# FROM node:lts-alpine3.22 
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
# RUN npm install --only-production
EXPOSE 8080
CMD ["npm", "start"]

# docker build -t server-test .