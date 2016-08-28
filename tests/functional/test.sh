#!/usr/bin/env bash

if [ "$1" == 'stop' ]; then
        echo "Stopping selenium server..."
        pid=`ps -eo pid,args | grep selenium-server-standalone | grep -v grep | cut -c1-6`
        echo $pid
        kill $pid
elif [ "$1" == 'start' ]; then
        echo "Starting selenium server..."
        PATH="./node_modules/phantomjs/bin:$PATH" java -jar ./node_modules/selenium-server/lib/runner/selenium-server-standalone-2.53.0.jar &> /dev/null &
        sleep 2
        BROWSERNAME=$BROWSER  ./node_modules/.bin/wdio ./tests/functional/wdio.conf.js
elif [ "$1" == 'start-ci' ]; then
        echo "[CI] Starting selenium server..."

        if [ ! -f selenium-server-standalone-2.53.1.jar ]; then
            echo "selenium jar File not found!"
            wget https://selenium-release.storage.googleapis.com/2.53/selenium-server-standalone-2.53.1.jar
        fi

        PATH="./node_modules/phantomjs/bin:$PATH" java -jar selenium-server-standalone-2.53.1.jar &> /dev/null &
        sleep 5
        BROWSERNAME=$BROWSER ./node_modules/.bin/wdio ./tests/functional/wdio.conf.js
else
        echo "Nothing to do!"
fi
