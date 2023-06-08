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
* redis singleton client: https://stackoverflow.com/questions/54240635/how-to-make-express-js-app-connect-redis-only-1-time-when-the-app-start-without
* how to emulate object enums: https://stackoverflow.com/questions/41179474/use-object-literal-as-typescript-enum-values
* prisma middleware for hashing passwords: https://stackoverflow.com/questions/69233726/cannot-hash-the-users-password-with-prisma-middleware-in-nestjs-on-create-user
