#!/bin/bash
echo "Cleaning Containers..."
docker rm -vf $(docker ps -a -q)
docker rmi -f $(docker images -a -q)
