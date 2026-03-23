FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npx ng build

FROM nginx:alpine
COPY --from=build /app/dist/arc-damage-calculator/browser /usr/share/nginx/html
EXPOSE 80
