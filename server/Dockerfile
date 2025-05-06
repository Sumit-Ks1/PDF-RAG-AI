# Use Node.js as the base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port that your Express app listens on
EXPOSE 8000

# Start both Express API and worker using PM2
CMD ["npx", "pm2-runtime", "pm2.config.cjs"]
