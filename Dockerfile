FROM node:alpine:3.14  as build
WORKDIR /patient
COPY package.json .
RUN npm install
COPY . .
RUN npm run build


FROM nginx:1.20.0-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=dist /patient/dist .
EXPOSE 80
ENTRYPOINT [ "nginx" ,"-g","daemon off;"]

