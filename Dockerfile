FROM node:24.12.0-bookworm-slim

WORKDIR /app

ENV CI=true
ENV WRANGLER_SEND_METRICS=false

COPY package.json package-lock.json .npmrc ./
RUN npm ci --include=dev --include=optional

COPY . .
RUN npm run build

EXPOSE 8080

CMD ["sh", "-c", "npm run db:local && exec node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js dev --config dist/server/wrangler.json --local --persist-to .wrangler/state --ip 0.0.0.0 --port 8080 --inspector-port 0"]
