var Identity = artifacts.require("./Identity.sol");
var Enroute  = artifacts.require("./Enroute.sol");

contract("Enroute", (accounts) => {
  let identity;
  let contractInterface = "0xdeadbeef";
  let contract = accounts[1];
  let user = accounts[0];

  before(async () => {
    identity = await Identity.new();
    enroute = await Enroute.new(identity.address);
  });

  it('should have an owner', async() => {
    assert.equal(accounts[0], await enroute.owner());
  });


  it("should have identity contract", async() => {
    let id = await enroute.identity();
    assert.equal(id, identity.address);
  });

  xit('should be able to create a shipment', async() => {
    assert.isTrue(false);
  });

  xit('should be able to move along supply chain', async() => {
    assert.isTrue(false);
  });


  xit('should not let a user of wrong type confirm shipment', async() => {
    assert.isTrue(false);
  });

});
