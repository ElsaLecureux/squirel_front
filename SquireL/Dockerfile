FROM node:18-alpine as builder 

WORKDIR /app

COPY package*.json ./

# installs the application dependencies
RUN npm install

COPY . .

# build static application for the web version
RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]