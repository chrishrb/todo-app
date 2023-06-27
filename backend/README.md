# Todo backend

## Getting started

1. Install all packages
   ```bash
   yarn install
   ```

2. Start redis and postgres server with docker
   ```bash
   docker-compose up -d

   # Migrate database and seed on first startup
   yarn run db:migrate-dev
   ```

3. Run application in dev mode
   ```bash
   yarn dev
   ```

## Swagger Docs

* The Swagger API Documentation can be seen under the following path: path_to_backend:port/api-docs/ 

## Code snippets from other sources

* https://github.com/domideimel/error-middleware  (not maintained anymore)
* all npm packages
* help from here: https://www.elliotdenolf.com/blog/cucumberjs-with-typescript
* redis singleton client: https://stackoverflow.com/questions/54240635/how-to-make-express-js-app-connect-redis-only-1-time-when-the-app-start-without
* how to emulate object enums: https://stackoverflow.com/questions/41179474/use-object-literal-as-typescript-enum-values
* prisma middleware for hashing passwords: https://stackoverflow.com/questions/69233726/cannot-hash-the-users-password-with-prisma-middleware-in-nestjs-on-create-user
