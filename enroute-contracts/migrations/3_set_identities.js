var Enroute = artifacts.require("./Enroute.sol");
var Identity = artifacts.require("./Identity.sol");

module.exports = function(deployer) {
  console.log(web3.eth.accounts);
  let manufacturer = web3.eth.accounts[4];
  let deliveryTruck = web3.eth.accounts[5];
  let supermarket = web3.eth.accounts[6];
  let ident, enroute;

  return Identity.deployed()
    .then((contract) => {
      ident = contract;
      return Enroute.deployed();
    })
    .then((enroute) => {
      ident.setAccess(enroute.address, manufacturer, true, 0);
      ident.setAccess(enroute.address, deliveryTruck, true, 1);
      ident.setAccess(enroute.address, supermarket, true, 2);
    })
};
