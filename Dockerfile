# Step 1: Build the app in a node.js environment
FROM node:20 as builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . ./

RUN npm run build --no-check

# Step 2: Serve the app in a Node.js environment
FROM node:20

WORKDIR /app
COPY --from=builder /app .

EXPOSE 3000

CMD ["npm", "run", "start"]
