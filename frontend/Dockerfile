FROM node:21.5.0-alpine3.19 as frontend_builder


WORKDIR /react

COPY . .

RUN npm install --force

RUN npm run build 

FROM nginx:1.25.3

RUN apt-get update && \
    apt-get install -y iputils-ping && \
    rm -rf /var/lib/apt/lists/*
    
COPY --from=frontend_builder /react/build /var/www/react

COPY ./nginx_frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx","-g","daemon off;"]