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

## Install

```bash
yarn ci
```

## Getting started

* Install all packages
  ```bash
  yarn ci
  ```
* Start `backend` (see [README](backend/README.md))
* Start `frontend` (see [README](frontend/README.md))

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

## Authors

* Hannes Ziereis
* Lucas Schießl
* Christoph Herb
