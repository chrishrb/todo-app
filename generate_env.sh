#!/bin/bash

postgres_username=app
postgres_password=$(openssl rand -hex 64)
auth_secret_key=$(openssl rand -hex 64)
redis_password=$(openssl rand -hex 64)

# .env
cat > .env << EOF
POSTGRES_USER=${postgres_username}
ADMIN_PASSWORD=$(openssl rand -hex 18)
USER_PASSWORD=$(openssl rand -hex 18)

# DEV
POSTGRES_PASSWORD=${postgres_password}
AUTH_SECRET_KEY=${auth_secret_key}
REDIS_PASSWORD=${redis_password}

# PROD
PROD_POSTGRES_PASSWORD=$(openssl rand -hex 64)
PROD_AUTH_SECRET_KEY=$(openssl rand -hex 64)
PROD_REDIS_PASSWORD=$(openssl rand -hex 64)
EOF

# backend/.env
cat > backend/.env << EOF
POSTGRES_USER=${postgres_username}
ADMIN_PASSWORD=admin
USER_PASSWORD=johni

POSTGRES_PASSWORD=${postgres_password}
AUTH_SECRET_KEY=${auth_secret_key}
REDIS_PASSWORD=${redis_password}
DATABASE_URL=postgresql://${postgres_username}:${postgres_password}@localhost:5432/todo?schema=public
REDIS_CLIENT_URL=redis://:${redis_password}@localhost:6379
EOF

# backend/.env.test
cat > backend/.env.test << EOF
DATABASE_URL=postgresql://${postgres_username}:${postgres_password}@localhost:5432/todo_test?schema=public
EOF
