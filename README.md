Contracts are written in solidity but also writing some contracts in LLL which is an alternative to solidity.


Checkout my [LLL Repo](https://github.com/Dsummers91/lll) for more information on deploying/developing. ggwp


use lllc (shipped with soldiity compiler) to compile or use binary in Encore.lll.bin to deploy

```geth attach http://localhost:8545```

or

`truffle console ` may possibly work but havent tested it
 
```
var bin = '3415600657fe5b336000556058806100186000396000f30060e060020a60003504606052638da5cb5b606051141560245760005460005260206000f35b63d87b40416060511415603e576004355460005260206000f35b63b60f3ec6606051141560575760016004355401600435555b'

var abi = [{"constant":true,"inputs":[],"name":"identity","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_shipment","type":"bytes32"}],"name":"confirmShipment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"shipments","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_identity","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"hash","type":"bytes32"},{"indexed":true,"name":"processor","type":"address"}],"name":"ShipmentProcessed","type":"event"}]

var contract = web3.eth.contract(abi).new("", {data: bin, from: web3.eth.coinbase, gas: 100000})

contract.confirmShipment(web3.sha3("test"), {from: web3.eth.coinbase, gas: 500000})

contract.shipments.call(web3.sha3("test"))

```


