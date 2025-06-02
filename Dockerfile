FROM nginx

COPY html/index.html /usr/share/nginx/html/index.html

EXPOSE 80