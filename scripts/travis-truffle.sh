#!/bin/bash

ganache-cli >/dev/null 2>&1 &
cd enroute-contracts/
truffle test
truffle migrate --reset
#kill -9 $(lsof -t -i:8545)
