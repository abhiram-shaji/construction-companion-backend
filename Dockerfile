# Use the Node.js base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the entire project directory into the container
COPY . .

# Install Node.js dependencies
RUN npm install

# Expose the port the application will run on
EXPOSE 3000

# Command to start the application
CMD ["npm", "run dev"]
