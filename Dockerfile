FROM ubuntu

ENV NODE_ENV production

RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get -y install nodejs npm supervisor
RUN apt-get -y install nodejs-legacy

COPY docker/supervisord.conf /etc/supervisor/supervisord.conf

# cache npm install when package.json hasn't changed
WORKDIR /tmp
ADD package.json package.json
RUN npm install
RUN npm install -g pm2

# pm2 logrotate module to automatically rotate logs
RUN pm2 install pm2-logrotate
RUN pm2 set pm2-logrotate:interval_unit 'mm'
RUN pm2 set pm2-logrotate:interval 60

RUN mkdir /quran
RUN cp -a /tmp/node_modules /quran

WORKDIR /quran
ADD . /quran/
RUN npm run build

EXPOSE 8000
CMD ["supervisord", "--nodaemon", "-c", "/etc/supervisor/supervisord.conf"]
