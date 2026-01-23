lint:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/build

start:
	make start-backend

develop:
	make start-backend & make start-frontend

build:
	rm -rf frontend/build
	npm run build

#alias for TS

backend-for-ts:
	npx start-server -s ./frontend-ts/dist

start-ts:
	make -C frontend-ts start

develop-ts:
	make backend-for-ts & make start-ts

build-ts:
	rm -rf frontend-ts/dist
	make -C frontend-ts build

lint-ts:
	make -C frontend-ts lint

lint-fix:
	make -C frontend-ts lint