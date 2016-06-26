FROM node:5.10.0

# environment variables
ENV NODE_ENV production
ENV API_URL http://api.quran.com:3000
ENV PORT 8000

# install ssh and rsync
RUN apt-get -y update && apt-get -y install supervisor ssh rsync

# logrotate config
RUN apt-get -y install logrotate
COPY docker/supervisord.conf /etc/supervisor/supervisord.conf
COPY docker/pm2.logrotate.conf /etc/logrotate.d/pm2
RUN cp /etc/cron.daily/logrotate /etc/cron.hourly

# cache npm install when package.json hasn't changed
WORKDIR /tmp
ADD package.json package.json
RUN npm install
RUN npm install -g pm2

# copy the node modules
RUN mkdir /quran
RUN cp -a /tmp/node_modules /quran

# build npm
WORKDIR /quran
ADD . /quran/
RUN npm run build

# ssh keys
WORKDIR /root
RUN mv /quran/.ssh /root/

# upload js and css
WORKDIR /quran/static/dist
RUN rsync --update --progress -raz . ahmedre@rsync.keycdn.com:zones/assets/

# go back to /quran
WORKDIR /quran

EXPOSE 8000
CMD ["supervisord", "--nodaemon", "-c", "/etc/supervisor/supervisord.conf"]
