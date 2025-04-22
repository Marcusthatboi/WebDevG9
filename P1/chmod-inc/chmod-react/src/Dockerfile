FROM node:23-slim

WORKDIR /app

COPY ../package*.json ./

# Install dependencies
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm","run", "dev"]