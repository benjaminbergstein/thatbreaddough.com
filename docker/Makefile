export PROJECT=next-project
export DOCKER_IMAGE=${PROJECT}:latest
export SERVICE=app
export PORT ?= 3000

define COMPOSE_CMD
docker-compose -p ${PROJECT} \
  --project-directory=.. \
  -f ./docker-compose.yml
endef

build:
	docker build ../${SERVICE} -t ${DOCKER_IMAGE}

start:
	${COMPOSE_CMD} up -d ${SERVICE}

logs:
	${COMPOSE_CMD} logs -f ${SERVICE}

stop:
	${COMPOSE_CMD} down --remove-orphans
