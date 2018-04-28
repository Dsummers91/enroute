#!/bin/bash

ganache-cli >/dev/null 2>&1 &
cd enroute-contracts/
truffle test
kill -9 $(lsof -t -i:8545)
