<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="#">
    <img src="docs/images/logo.png" alt="Logo" height="80">
  </a>

  <h3 align="center">ToDo List</h3>

  <p align="center">
    An awesome way to track your todos
  </p>
</div>

## Getting started (dev)

* Start `backend` (see [README](backend/README.md))
* Start `frontend` (see [README](frontend/README.md))

### Links

* **Frontend:** http://localhost:5173
* **Backend:** http://localhost:3000/api/v1
* **Adminer:** http://localhost:8081
* **Swagger-Documentation:** http://localhost:3000/api-docs

## Run production

```bash
# build frontend and backend
docker-compose -f docker-compose-prod.yml build

# start all services
docker-compose -f docker-compose-prod.yml up -d
```

### Links

* **Frontend:** http://localhost
* **Backend:** http://localhost/api/v1
* **Adminer:** http://localhost:8081
* **Swagger-Documentation:** http://localhost/api-docs

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
* some helper libraries (ms, tslog, datejs, class-validator, types for typescript, bcrypt, cookie-parser, axios)

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
