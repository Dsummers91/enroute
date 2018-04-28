#!/bin/bash

ganache-cli 2>&1 /dev/null &
sleep 10
cd enroute-contracts/
truffle test
sleep 10
kill -9 $(lsof -t -i:8545)
