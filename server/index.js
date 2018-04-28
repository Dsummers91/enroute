const BN = require("bn.js");
const app = require('express')()
const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider("http://localhost:8545");
let web3 = new Web3(provider);
const sku = require('./sku.js');
const contract = require("truffle-contract");
const actors = require('./actors.js');
const bodyParser = require('body-parser')
const Identity = contract(require('../enroute-contracts/build/contracts/Identity.json'))
const Enroute = contract(require('../enroute-contracts/build/contracts/Enroute.json'))

Enroute.setProvider(provider);
Identity.setProvider(provider);


app.use(bodyParser.json());

app.get('/enroute/identity', async(req, res) => {
  let enroute = await Enroute.deployed();
  let identity = await enroute.identity();
  res.send({id: identity});
});


// @param actor
// @param shipHash 
app.post('/process', async(req, res) => {
  let enroute = await Enroute.deployed();
  if (!actors.hasOwnProperty(req.body.actor)) {
    return res.send({'error': 'actor does not exist! [manufacturer, deliveryTruck, superMarket]'});
  }

  let tx = await enroute.confirmShipment(web3.sha3(Math.random().toString()), {from: web3.eth.accounts[4]}); 
  res.send({txHash: tx});
});

// @dev Returns list of SKU's that are being sent
// @note Can probably just hardcode this?
app.get('/sku', async (req, res) => {
	res.send(await sku.generateSkuList());
});

// @dev Return XOR Hash of list of SKU's to give a ship identifier
app.post('/ship', async (req, res) => {
	let shipHash;
  let skus = req.body.skus;
	res.send({'shipHash': '0x' + skus.reduce((a, b) => {
		a = new BN(web3.sha3(a), 16);
		b = new BN(web3.sha3(b), 16);
		return a.xor(b).toString(16);
	})});
})

// @dev reverse XOR hash to make sure all shipments are there
// @param shipHash Hash of overall shipments
// @param skus List of skus within the hash
// @note should equal 0x0 if skus match up
// @todo will be a POST (shipHash, and skus as args)
app.post('/ship/confirm', async (req, res) => {
	let shipHash = req.body.shipHash.substr(2);
	let skus = req.body.skus;
  skus.push(shipHash);
	let hash = skus.reduce((a, b) => {
		a = new BN(web3.sha3(a), 16);
		b = new BN(web3.sha3(b), 16);
		return a.xor(b).toString(16);
	});
	res.send({confirmed: hash == 0})
});


server = app.listen(process.env.PORT || 8080, () => {
	console.log('listening on port: ', process.env.PORT || 8080);
})

module.exports = server;


