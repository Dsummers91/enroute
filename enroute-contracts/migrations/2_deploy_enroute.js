var Enroute = artifacts.require("./Enroute.sol");
var Identity = artifacts.require("./Identity.sol");

module.exports = function(deployer) {
  return deployer.deploy(Identity)
    .then(() => {
      return Identity.deployed()
    })
    .then((identity) => {
      return deployer.deploy(Enroute, identity.address);
    });
};
