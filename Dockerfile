FROM node:22-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --include=optional --no-audit --no-fund

COPY . .
RUN npm run build

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
