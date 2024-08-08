# Stage 1: Build
FROM node:14-alpine as build
WORKDIR /patient
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:1.20.0-alpine
COPY --from=build /patient/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
