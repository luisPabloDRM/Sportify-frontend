FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS deploy
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist/frontend/browser ./browser
CMD serve -s browser -l ${PORT:-3000}
