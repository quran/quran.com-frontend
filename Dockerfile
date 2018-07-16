FROM node:8.9

ENV NODE_ENV production
ENV API_URL http://api.quran.com:3000
ENV SENTRY_KEY_CLIENT https://app.getsentry.com
ENV SENTRY_KEY_SERVER https://app.getsentry.com

ENV FACEBOOK_APP_ID appid
ENV ONE_QURAN_URL https://one.quran.com
ENV PORT 8000
ENV NODE_PATH "./src"

RUN apt-get -y update && apt-get -y install supervisor ssh rsync

# logrotate
RUN apt-get -y install logrotate
COPY docker/supervisord.conf /etc/supervisor/supervisord.conf
COPY docker/pm2.logrotate.conf /etc/logrotate.d/pm2
RUN cp /etc/cron.daily/logrotate /etc/cron.hourly

# cache npm install when package.json hasn't changed
WORKDIR /tmp
ADD package.json package.json
RUN npm install --silent --no-progress
RUN npm install -g pm2

RUN mkdir /quran
RUN cp -a /tmp/node_modules /quran

WORKDIR /quran
ADD . /quran/

RUN npm run build:client
RUN npm run build:server

# ssh keys
WORKDIR /root
RUN mv /quran/.ssh /root/

# upload js and css
WORKDIR /quran/static/dist
RUN rsync --update --progress -raz . ahmedre@rsync.keycdn.com:zones/assets/

# go back to /quran
WORKDIR /quran

ENV NODE_PATH "./dist"

EXPOSE 8000
CMD ["supervisord", "--nodaemon", "-c", "/etc/supervisor/supervisord.conf"]
