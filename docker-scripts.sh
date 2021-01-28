#!/bin/bash

FOLDER=docker

if [ "$1" = "stop" ]; then docker-compose --project-directory . -f ${FOLDER}/docker-compose.yml -f ${FOLDER}/prod.yml down
elif [ "$1" = "prod" ]; then docker-compose --project-directory . -f ${FOLDER}/docker-compose.yml -f ${FOLDER}/prod.yml up $2
elif [ "$1" = "prod:build" ]; then docker-compose --project-directory . -f ${FOLDER}/docker-compose.yml -f ${FOLDER}/prod.yml up --build $2
else docker-compose --project-directory . -f ${FOLDER}/docker-compose.yml -f ${FOLDER}/dev.yml up
fi