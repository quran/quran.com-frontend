FROM ubuntu

ENV NODE_ENV production

RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get -y install nodejs npm supervisor
RUN apt-get -y install nodejs-legacy

# logrotate
RUN apt-get -y install logrotate
COPY docker/supervisord.conf /etc/supervisor/supervisord.conf
COPY docker/pm2.logrotate.conf /etc/logrotate.d/pm2
RUN cp /etc/cron.daily/logrotate /etc/cron.hourly

# cache npm install when package.json hasn't changed
WORKDIR /tmp
ADD package.json package.json
RUN npm install
RUN npm install -g pm2

RUN mkdir /quran
RUN cp -a /tmp/node_modules /quran

WORKDIR /quran
ADD . /quran/
RUN npm run build

EXPOSE 3001
CMD ["supervisord", "--nodaemon", "-c", "/etc/supervisor/supervisord.conf"]
