<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="#">
    <img src="frontend/docs/images/logo.png" alt="Logo" height="80">
  </a>

  <h3 align="center">ToDo List</h3>

  <p align="center">
    An awesome way to track your todos
  </p>
</div>

## Prepare environment

Execute the following command to create the necessary environment variables:

```bash
./generate_env.sh
```

## Getting started (dev)

1. [Prepare environment](#prepare-environment)
2. Start `backend` (see [README](backend/))
3. Start `frontend` (see [README](frontend/))

### Credentials for Login

| email           | password  |
|-----------------|-----------|
| admin@todo.com  | admin     |
| john@todo.com   | johni     |

### Links

* **Frontend:** http://localhost:5173
* **Backend:** http://localhost:3000/api/v1
* **Adminer:** http://localhost:8081
* **Swagger-Documentation:** http://localhost:3000/api-docs

## Run production

1. First [prepare environment](#prepare-environment)
2. Start all container
   ```bash
   # build frontend and backend
   docker compose -f docker-compose-prod.yml build

   # start all services
   docker compose -f docker-compose-prod.yml up -d

   # (only first time: seed database with initial data)
   docker compose exec -it backend /usr/local/bin/npm run db:seed
   ```

### Credentials for Login

After [preparing your environment](#prepare-environment), see [.env](./.env).

### Links

* **Traefik Dashboard:** http://localhost:8082
* **Frontend:** http://localhost
* **Backend:** http://localhost/api/v1
* **Adminer:** http://localhost:8081

## Decisions 

* mono repository
* todo app
* feature based development

## Technologies

### Backend

* express: 4.18
* swagger
* postgresql: 15.2
* redis
* jsonwebtoken
* prisma: 4.11
* some helper libraries (ms, tslog, datejs, class-validator, types for typescript, cookie-parser, axios)

### Frontend

* vue: 3.2
* pinia: 2.0 (vue 3 state management)
* tailwindcss with preline
* axios
* heroicons
* nginx (frontend server for production)

### Other

* docker
* traefik (reverse proxy)

## Authors

* Hannes Ziereis
* Lucas Schießl
* Christoph Herb
