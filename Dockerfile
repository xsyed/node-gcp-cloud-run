FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Expose the port your Express app listens on (Cloud Run uses 8080 by default)
ENV PORT 8080
EXPOSE 8080
CMD ["node", "src/app.js"]
