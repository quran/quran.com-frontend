FROM node:6.3

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

ENV NODE_ENV production
ENV API_URL http://api.quran.com:3000
ENV SENTRY_KEY_CLIENT https://44c105328ae544ae9928f9eb74b40061@app.getsentry.com/80639
ENV SENTRY_KEY_SERVER https://44c105328ae544ae9928f9eb74b40061:41ca814d33124e04ab450104c3938cb1@app.getsentry.com/80639
# It's okay because it's only the APP ID
ENV FACEBOOK_APP_ID 1557596491207315
ENV ONE_QURAN_URL https://one.quran.com
ENV PORT 8000
ENV NODE_PATH "./src"

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
