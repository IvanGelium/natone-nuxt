FROM node:22-slim AS builder

WORKDIR /app

COPY package.json ./
RUN npm install --include=optional --no-audit --no-fund

# Ensure the linux native binding is present (workaround for npm optional deps bug)
RUN npm install @oxc-parser/binding-linux-x64-gnu --no-save --no-audit --no-fund

COPY . .
ENV NODE_OPTIONS="--max-old-space-size=1536"
RUN npm run build

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
