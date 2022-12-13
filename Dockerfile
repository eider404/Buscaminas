FROM httpd:2.4
WORKDIR /usr/local/apache2/htdocs/
EXPOSE 80
COPY . ./
