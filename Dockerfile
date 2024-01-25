# Use the official Node.js image as a base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Angular CLI and dependencies
RUN npm install -g @angular/cli && npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Angular application with the /angular base URL
RUN ng build --base-href /angular/

# Expose the default port used by Angular
EXPOSE 4200

# Start the Angular application
CMD ["npm", "start"]
