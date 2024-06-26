FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY frontend/dist ./frontend/dist

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]