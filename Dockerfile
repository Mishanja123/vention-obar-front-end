FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g serve

COPY . .

RUN npm run build

EXPOSE 5173

# Start the serve command to serve the static files
CMD ["serve", "-s", "dist", "-l", "5173"]