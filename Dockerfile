FROM node:20-alpine as builder
RUN mkdir -p /app/node_modules && chown -R node:node /app
WORKDIR /app
COPY --chown=node:node package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
RUN npm run build
RUN npx tsc migrations/* --outDir dist/migrations
RUN npx tsc knexfile.ts --outDir dist

FROM node:20-alpine as runner
RUN mkdir -p /app/node_modules && chown -R node:node /app
WORKDIR /app
USER node
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
RUN npm install --omit=dev
RUN rm -rf `npm config get cache`
EXPOSE 8080
ENV NODE_ENV=production
ENTRYPOINT ["npm", "run", "start:live"]
