# Todo backend

## Getting started

* Create .env file with the following environment variables:
  ```bash
  DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todo?schema=public"
  # generate with command: openssl rand -base64 60
  AUTH_SECRET_KEY=
  ```

* Start redis and postgres server with docker
  ```bash
  docker-compose up -d
  ```

* Run application in dev mode
  ```bash
  yarn install
  yarn dev
  ```

## Code snippets from other sources

* https://github.com/domideimel/error-middleware  (not maintained anymore)
* all npm packages
* help from here: https://www.elliotdenolf.com/blog/cucumberjs-with-typescript
