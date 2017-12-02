FROM node:6.3

ARG node_env=production
ARG node_path=./dist

ENV NODE_ENV $node_env
ENV NODE_PATH $node_path

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

RUN if [ "$NODE_ENV" = "production" ]; then \
      npm run build:client && \
      npm run build:server; \
    fi

# port 8080 is needed in dev for the webpack live reload server
EXPOSE 8000 8080

CMD ["bin/server.sh"]
