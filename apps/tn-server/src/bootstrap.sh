#!/bin/ash

./node_modules/.bin/forever -a -f \
--uid trivia-nation \
--kilSignal=SIGTERM \
-c './node_modules/.bin/nodemon --exitcrash' main.js
