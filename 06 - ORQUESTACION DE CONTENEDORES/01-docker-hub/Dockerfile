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

# docker login

# docker tag server-test <dockerhub-username>/server-test:1.0.0

# docker push <dockerhub-username>/server-test:1.0.0
# docker push dipietrojm/server-test:1.0.0