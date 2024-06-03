# Gunakan Nginx sebagai base image
FROM nginx:latest

# Salin file index.html ke dalam direktori default Nginx di dalam container
COPY index.html /usr/share/nginx/html

# Expose port 80 untuk mengakses web server Nginx
EXPOSE 90
