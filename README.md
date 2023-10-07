# Meetup-demo

**Meetup-project** is a simple Node.js demo server for deploying to EC2.

## Building and Running the Docker Image

**Build the Docker image:**
```
  docker build -t node-app-image .
```
**Run the image container without port mapping:**
```
  docker run -d --name node-app node-app-image
```
**Run the image container with port mapping (e.g., 4000 on the host to 3000 in the container):**
```
  docker run -p 4000:3000 -d --name node-app node-app-image
```
**Run the image container with volumes (mount current directory to /app in the container):**
```
  docker run -v $(pwd):/app -p 3000:3000 -d --name node-app node-app-image
```

## Using Docker Compose
**to only build docker image with docker-compose**
```
  docker-compose build
```
**Build and start the services & container at once:**
```
  docker-compose up -d
```
