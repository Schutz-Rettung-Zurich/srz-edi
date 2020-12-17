# base image
FROM node:12-alpine as build

# where the app live in the container
WORKDIR /app

# Copy React App to container
COPY . /app/

# Prepare container
RUN npm install
RUN npm install react-scripts@3.0.1 -g

# Run production version
RUN npm run build

# Prepare nginx
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d