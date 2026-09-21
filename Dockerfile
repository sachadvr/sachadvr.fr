FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Vite inline les VITE_* au build : l'URL d'API est figée dans le bundle
ARG VITE_API_URL=https://api.sachadvr.fr
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Stage de dev : serveur Vite avec HMR, le code est monte en volume par docker-compose.
# Volontairement place avant le stage final pour que `docker build .` (CI/prod) cible toujours nginx.
FROM node:20-alpine AS dev

WORKDIR /app

COPY package*.json ./

RUN npm ci

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM nginx:1.27-alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
