
#!/bin/bash
if [ "$1" == 'stop' ]; then
        echo "Stopping selenium server..."
        pid=`ps -eo pid,args | grep selenium-server-standalone | grep -v grep | cut -c1-6`
        echo $pid
        kill $pid
elif [ "$1" == 'start' ]; then
        echo "Starting selenium server..."
        sleep 10
        ./node_modules/.bin/wdio ./tests/functional/wdio.conf.js
else
        echo "Nothing to do!"
fi
