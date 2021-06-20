#!/bin/bash
if !(nodemon --version); then
    echo "Node dependencies not found. Installing."
    npm install -g nodemon
    npm install cors --save
else
    echo "Node dependencies found. Proceeding"
fi

go=0;

function check_running() {
    nodemon /application/app.js
}

check_running;
sleep 10;
check_running;

