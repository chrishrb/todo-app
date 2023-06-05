# INFO: As of https://github.com/yanyiwu/nodejieba/issues/187 there 
# are issues with M1 Macs and node:lts-alpine so we use this image instead
FROM node:16-bullseye-slim as builder
WORKDIR /app

# Install dependencies
COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma
RUN yarn ci

# Build application
COPY . .
RUN yarn build

FROM node:16-bullseye-slim as production
WORKDIR /app

COPY --from=builder /app/prisma /app/prisma
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/build /app/build
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 3000
CMD ["npm", "run", "start"]
