FROM node:20-alpine as node
RUN mkdir -p /app/node_modules && chown -R node:node /app
WORKDIR /app
COPY --chown=node:node package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
RUN npm run build
EXPOSE 8080
ENV NODE_ENV=production
ENTRYPOINT ["npm", "start"]
