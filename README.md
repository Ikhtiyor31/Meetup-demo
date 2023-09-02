# Meetup-project
this is a simple nodejs demo server for deploying to ec2

build docker image
docker build -t node-app-image 

run image container without port
docker run -d --name node-app node-app-image

docker image container with port
docker run -p 4000:3000 -d --name node-app node-app-image 

docker run with volumes 
docker run -v $(pwd):/app -p 3000:3000 -d --name node-app node-app-image

docker compose build 
docker compose up -d --build 

to check real time logs of containers if load balancer is working
