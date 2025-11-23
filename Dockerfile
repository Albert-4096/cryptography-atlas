# syntax=docker/dockerfile:1

############################
# 1) Build stage
############################
FROM node:22-alpine AS build

WORKDIR /app

# Install deps
COPY package.json ./
RUN npm install

# Copy the rest of the source
COPY . .

# Optionally pass GEMINI_API_KEY at build time
ARG GEMINI_API_KEY
ENV GEMINI_API_KEY=${GEMINI_API_KEY}

# Build the Vite app
RUN npm run build

############################
# 2) Nginx runtime image
############################
FROM nginx:1.27-alpine

# Copy built static files
COPY --from=build /app/dist /usr/share/nginx/html

# Custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

