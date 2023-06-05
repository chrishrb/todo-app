FROM node:lts-alpine as builder
WORKDIR /app

# Install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn ci

# Build application
COPY ./ ./
RUN yarn build

FROM nginx:alpine as production
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
