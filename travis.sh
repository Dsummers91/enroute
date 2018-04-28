#!/bin/bash

ganache-cli >/dev/null 2>&1 &
npm test
cd enroute-contracts/
truffle test
kill -9 $(lsof -t -i:8545)
