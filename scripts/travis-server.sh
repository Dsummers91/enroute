#! /bin/bash

nohup npm start >/dev/null 2>&1 &
npm run test
