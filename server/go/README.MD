# Static server for JS assets

DealTap 4.0 static frontend server

## Requirements

- [make](http://www.gnu.org/software/make/)
- [go](https://golang.org/), version 1.10+
  - Follow docs to configure `GOPATH` and its sub-directories: `GOPATH/bin`, `GOPATH/pkg` & `GOPATH/src`.
- [dep](https://golang.github.io/dep/), the go dependency package manager.

## Purpose

Server, written in Go, to serve frontend files: Javascript/CSS/assets. Can be run independently and inside of the docker container.
Refer to Makefile to see list of available commands.

## How to Run in Docker container

- Install/update dependencies.
- Build frontend files
- Build static server binary
- Run the app in docker container

```bash
make install
yarn install
yarn build
make build-static-linux
```
