const BN = require("bn.js");
const app = require('express')()
const Web3 = require('web3');
const sku = require('./sku.js');

let web3 = new Web3();

// @dev Returns list of SKU's that are being sent
// @note Can probably just hardcode this?
app.get('/sku', async (req, res) => {
	res.send(await sku.generateSkuList());
});

// @dev Return XOR Hash of list of SKU's to give a ship identifier
app.get('/ship', async (req, res) => {
	let shipHash;
  let skus = await sku.generateSkuList();
	res.send('0x' + skus.reduce((a, b) => {
		a = new BN(web3.sha3(a), 16);
		b = new BN(web3.sha3(b), 16);
		return a.xor(b).toString(16);
	}));
})

// @dev reverse XOR hash to make sure all shipments are there
// @param shipHash Hash of overall shipments
// @param skus List of skus within the hash
// @note should equal 0x0 if skus match up
// @todo will be a POST (shipHash, and skus as args)
app.get('/ship/confirm', async (req, res) => {
	let shipHash = '0x87a5396475b4411ad1568f099f17fe78cdc42241b9ad4d2405ca36f8e8550b9f3'.substr(2);
  let skus = await sku.generateSkuList();
	skus.push(shipHash);
	let hash = skus.reduce((a, b) => {
		a = new BN(a, 16);
		b = new BN(b, 16);
		return a.xor(b).toString(16);
	});
	res.send({confirmed: hash == 0})
});

app.listen(8080, () => {
	console.log('listening on port 8080');
})
