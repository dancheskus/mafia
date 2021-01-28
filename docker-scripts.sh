#!/bin/bash

FOLDER=docker
BASE_COMMAND="docker-compose --project-directory . -f ${FOLDER}/docker-compose.yml -f ${FOLDER}/"

if [ "$1" = "stop" ]; then ${BASE_COMMAND}prod.yml down
elif [ "$1" = "prod" ]; then ${BASE_COMMAND}prod.yml up $2
elif [ "$1" = "prod:build" ]; then ${BASE_COMMAND}prod.yml up --build $2
else ${BASE_COMMAND}dev.yml up
fi