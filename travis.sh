#!/bin/bash

ganache-cli >/dev/null 2>&1 &
sleep 10
cd enroute-contracts/
truffle test
sleep 10
kill -9 $(lsof -t -i:8545)
