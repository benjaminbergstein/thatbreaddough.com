export PROJECT=bread-timer
export DOCKER_IMAGE=${PROJECT}:latest
export SERVICE ?= app
export PORT ?= 20000
export ENVIRONMENT ?= development

define COMPOSE_CMD
docker-compose -p ${PROJECT}_${ENVIRONMENT} \
  --project-directory=.. \
  -f ./docker-compose.${ENVIRONMENT}.yml
endef

build:
	docker build ../${SERVICE} -t ${DOCKER_IMAGE}

start:
	${COMPOSE_CMD} up -d ${SERVICE}

console:
	${COMPOSE_CMD} exec ${SERVICE} /bin/bash

logs:
	${COMPOSE_CMD} logs -f ${SERVICE}

stop:
	${COMPOSE_CMD} down --remove-orphans

sitemap:
	curl http://www.google.com/ping?sitemap=https://www.thatbreaddough.com/sitemap.xml

nginx:
	${COMPOSE_CMD} up -d nginx

pull:
	git pull --rebase origin master

release: ENVIRONMENT=production
release: pull build stop start nginx sitemap
