FROM node:10.16.3-alpine as node-build-env
LABEL maintainer="Vishnu"
WORKDIR /app
ADD package.json /app
ADD package-lock.json /app
RUN cd /app && npm install
ADD . ./
RUN npm run build

FROM nginx:alpine
LABEL maintainer="Vishnu"
COPY --from=node-build-env /app/build/* /usr/share/nginx/html/
EXPOSE 80
