# Build stage
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --only=production

COPY . .
COPY --from=build /app/.nuxt ./.nuxt

EXPOSE 8080
CMD ["npm", "start"]