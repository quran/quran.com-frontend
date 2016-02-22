FROM node:5.1.1

# cache npm install when package.json hasn't changed
WORKDIR /tmp
ADD package.json package.json
RUN npm install
RUN npm install -g pm2

RUN mkdir /sparrow
RUN cp -a /tmp/node_modules /sparrow

WORKDIR /sparrow
ADD . /sparrow/
ENV NODE_ENV production
ENV API_URL http://marketplace.peek.com
ENV PIRATE_URL http://www.peek.com
RUN npm run build

# upload js and css
WORKDIR /sparrow/build
# UPLOAD TO S3!

# go back to /sparrow
WORKDIR /sparrow

ENV NODE_ENV production
ENV NODE_PATH "./src"
ENV HOST 127.0.0.1
ENV PORT 8000
ENV API_URL http://marketplace.peek.com
ENV PIRATE_URL http://www.peek.com
ENV DISABLE_SSR false

EXPOSE 8000
CMD ["pm2", "start", "./bin/server.js", "--no-daemon", "-i", "0"]
