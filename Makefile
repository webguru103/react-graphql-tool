# Makefile
#

# When creating a PR, set this tag to a version of the backend this
# branch should be compatible with.
BACKEND_COMPATIBILITY_VERSION := "v4.0.2.10"

help:
	@echo "Usage: {options} make [target ...]"
	@echo
	@echo "Commands:"
	@echo "  build-static			 build go static server as binary"
	@echo "  build-static-linux      build go static server as binary for linux distro's"
	@ceho "  docker-build    builds the service docker container"
	@echo "  docker-run	     runs the docker container"
	@echo "  be-version	     returns the version of the backend this branch is compatible with"
	@echo "  docker-launch	 builds and launches frontend in docker"
	@echo "  docker-down	   shuts down and deletes docker container"
	@echo "  e2e-tests       runs the e2e tests in docker"
	@echo "  e2e-tests-down  removes e2e tests docker container"
	@echo
	@echo "  help            Show available commands"
	@echo
	@echo "Examples:"
	@echo "  # Getting started"
	@echo "  make install"
	@echo

install:
	@ echo "Download required dependencies"
	@ GO111MODULE=on go mod vendor
	@ echo "Finished downloading required dependencies"

build-static:
	@ ( cd server/go/$(s) ; go build -o static-bin )

build-static-linux:
	@ ( cd server/go/$(s) ; CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o static-bin )

docker-build:
	@ echo "Building docker image..."
	docker build --no-cache -t dealtap/frontend:latest -f Dockerfile .
	@ echo "Finished building docker image"

docker-run:
	docker-compose up -d frontend

be-version:
	@echo ${BACKEND_COMPATIBILITY_VERSION}

docker-launch:
	@ echo "Building frontend, building and launching docker"
	make install
	yarn install
	yarn build:e2e
	make docker-build
	make docker-run
	@ echo "Launch complete"

docker-down:
	@ echo "Stopping docker container"
	@ docker-compose down -v
	@ echo "Docker container stopped"

e2e-backend:
# Set enviroment variables required by docker containers from .env.
# To do this, run this command in current shell:
# set -a && . .env && set +a
	@ echo "Starting dockerized test database with mock data."
	@ temp=$(pwd)/e2e/t1-test-data.sql
	@ cp ./e2e/t1-test-data.sql ${GOPATH}/src/bitbucket.org/dealtap/backend/tools/build/db/init/
	@ ( cd ${GOPATH}/src/bitbucket.org/dealtap/backend/ ; make db-clean && make docker-down s=core && make db && make docker-launch s=core )
	@ rm ${GOPATH}/src/bitbucket.org/dealtap/backend/tools/build/db/init/t1-test-data.sql
	@ echo "Finished building test database with mock data."

e2e-tests:
# Set enviroment variables required by docker containers from .env.
# To do this, run this command in current shell:
# set -a && . .env && set +a
# Note:
# - browsers don't seem to work together properly when sent in the same run.
# eg. use export BROWSERS='firefox' and export BROWSERS='chromium --no-verify' in separate test runs.
# - that chromium must be run with --no-sandbox
# - make sure your env file for the BE HTTP_ENDPOINT is your network IP eg. http://192.168.0.185
# and not localhost.
	@ make e2e-backend
	@ make docker-launch
	@ echo "Building and running testcafe"
	@ docker container stop testcafe || true
	@ docker container rm testcafe || true
	@ docker ps
	@ docker build ./e2e -t testcafe:custom --build-arg FRONTEND_BASE_URL=${FRONTEND_BASE_URL} --build-arg HTTP_ENDPOINT=${HTTP_ENDPOINT} --build-arg TEST_USER_PASSWORD=${TEST_USER_PASSWORD} --build-arg TEST_USER_EMAIL=${TEST_USER_EMAIL}
	@ docker run --shm-size 2g --name testcafe -v ${FRONTEND_PATH}e2e/tests:/tests testcafe:custom '${BROWSERS}' /tests/**/*e2e.js -s tests/screenshots -S -c 6

e2e-tests-down:
	@ echo "Stopping e2e docker container, cleaning up"
	@ docker container stop testcafe
	@ docker container rm testcafe
	@ echo "Docker container stopped"
