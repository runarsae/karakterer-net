# Use official Node.js image as the base image
FROM node:18-buster

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run prebuild

# Expose the Next.js development server port
EXPOSE 3000

# Default command
CMD ["npm", "run", "dev"]

