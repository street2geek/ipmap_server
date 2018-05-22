FROM node:9

WORKDIR /app

COPY package*.json ./

ADD . /app

RUN npm install

EXPOSE 8000

# Run the application
CMD ["npm", "start"]

