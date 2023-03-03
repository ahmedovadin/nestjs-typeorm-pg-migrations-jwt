FROM node:12.13-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

# COPY . .

COPY ./app/dist ./app/dist

# RUN npm migration:generate
# RUN npm migration:run

CMD ["npm", "run", "start:prod"]