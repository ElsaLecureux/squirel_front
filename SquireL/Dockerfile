FROM node:18-alpine as builder 

WORKDIR /src/app

COPY package*.json ./

# installs the application dependencies
RUN npm install

COPY . .

# build nestjs application
RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]