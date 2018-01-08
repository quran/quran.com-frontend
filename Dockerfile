FROM node:8.9

ARG node_env=production

ENV NODE_ENV $node_env
ENV NODE_PATH ./src

RUN mkdir /quran
WORKDIR /quran

# cache node_modules using docker layers
# any change to package.json will rebuild modules
ADD package.json /quran/package.json
RUN if [ "$NODE_ENV" = "production" ]; then \
      npm install --silent --production; \
    else \
      npm install; \
    fi

# you would typically mount ./src:/quran/src during dev
ADD . /quran/

ARG facebook_app_id
ARG assets_url
ARG public_api_url
ARG one_quran_url
ARG sentry_key_client

ENV FACEBOOK_APP_ID $facebook_app_id
ENV ASSETS_URL $assets_url
ENV PUBLIC_API_URL $public_api_url
ENV ONE_QURAN_URL $one_quran_url
ENV SENTRY_KEY_CLIENT $sentry_key_client

RUN if [ "$NODE_ENV" = "production" ]; then \
      npm run build:client && \
      npm run build:server; \
    fi

# port 8080 is needed in dev for the webpack live reload server
EXPOSE 8000 8080

CMD ["bin/server.sh"]
