server {
  listen   80;
  server_name  quran;

  access_log  /var/log/nginx/next.quran.com/access.log;

  location / {
    root   /quran;
    index  index.html index.htm;

       proxy_redirect off;
       proxy_set_header X-NginX-Proxy true;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Real-IP $remote_addr;

       proxy_set_header   X-Real-IP $remote_addr;
       proxy_set_header   Host      $http_host;
       proxy_pass         http://127.0.0.1:8000;
  }
}
