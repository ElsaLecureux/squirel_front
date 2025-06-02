FROM node:18-alpine as builder 

WORKDIR /app

COPY package*.json ./

# installs the application dependencies
RUN npm install -g expo-cli && \
    npm install

COPY tsconfig*.json ./

COPY . .

# Create a .env file with environment variables from build args
ARG TOKEN_API_RADIO_FRANCE
ARG URL_API_RADIO_FRANCE
RUN echo "TOKEN_API_RADIO_FRANCE=${TOKEN_API_RADIO_FRANCE}" > .env && \
    echo "URL_API_RADIO_FRANCE=${URL_API_RADIO_FRANCE}" >> .env

# build static application for the web version
RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]