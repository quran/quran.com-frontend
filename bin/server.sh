#!/bin/bash

if [ "$NODE_ENV" == "production" ]; then
  node bin/server.prod.js
else
  # must add --host 0.0.0.0 to be accessible from outside docker container
  # see https://github.com/webpack/webpack-dev-server/issues/183#issuecomment-128436301
  node --expose-gc \
    ./node_modules/webpack-dev-server/bin/webpack-dev-server.js \
    --config ./webpack/dev.config.js \
    --host 0.0.0.0 --progress  &
  node --expose-gc ./bin/server.js
fi