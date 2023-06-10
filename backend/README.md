# Todo backend

## Getting started

1. Start redis and postgres server with docker
   ```bash
   docker-compose up -d

   # Migrate database and seed on first startup
   yarn run db:migrate-dev
   ```

2. Run application in dev mode
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
