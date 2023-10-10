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

## To install docker && docker-compose on EC2 instance (Amazon Linux 2), run the following commands.
**First, update and upgrade EC2 Linux**
```
  sudo yum update && upgrade
```
**Install docker**
```
  sudo yum install docker
```
**then, install docker-compose(check current and change it, now current version: v2.20.3)**
```
  sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
**to make binary executable**
```
  sudo chmod +x /usr/local/bin/docker-compose
```
**to check docker-compose version**
```
  docker-compose --verions
```
**to add permission to docker user**
```
  sudo usermod -a -G docker ec2-user
```
**start and run docker**
```
  sudo systemctl enable docker
  sudo systemctl start docker
```
**create docker-compose.yml in current directory(/home/ec2-user) and paste the following yml content**
```
  version: "3"
services:
  nginx:
    image: nginx:stable-alpine
    ports: 
      - "3000:80"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
  node-app-1:
    build:
      context: .
    image: ikhtiyor31/node-app
    platform: linux/amd64
    environment:
      - PORT=3000
```
**create another file nginx/default.conf for nginx setup in current directory(/home/ec2-user) and copy and paste the following content**
```
upstream node_app {
      server node-app-1:3000;
}

server {
  listen 80;

  location /{
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    
    proxy_set_header Host $http_host;
    proxy_set_header X-Nginx-Proxy true;
    proxy_pass http://node_app;
    proxy_redirect off;
  }
}
```
**check the file (.github/workflow/push-to-dockerhub.yml) and update DOCKER account details and EC2 account details on your github secrets & variables sections**

