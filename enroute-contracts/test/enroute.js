var Identity = artifacts.require("./Identity.sol");
var Enroute  = artifacts.require("./Enroute.sol");

contract("Enroute", (accounts) => {
  let identity;
  let contractInterface = "0xdeadbeef";
  let shipHash = web3.sha3('blah');
  let user = accounts[0];
  let manufacturer = accounts[4];
  let deliveryTruck = accounts[5];
  let supermarket = accounts[6];

  before(async () => {
    identity = await Identity.new();
    enroute = await Enroute.new(identity.address);
    
    // Allow person to create shipment (manufacturer)
    await identity.setAccess(enroute.address, manufacturer, true, 0);
    await identity.setAccess(enroute.address, deliveryTruck, true, 1);
    await identity.setAccess(enroute.address, supermarket, true, 2);
  });

  it('should have an owner', async() => {
    assert.equal(accounts[0], await enroute.owner());
  });


  it("should have identity contract", async() => {
    let id = await enroute.identity();
    assert.equal(id, identity.address);
  });

  it('should not be able to create a shipment when not manufactuer', async() => {
    try {
      await enroute.confirmShipment(shipHash, {from: deliveryTruck});
      assert.isTrue(false, 'transaction did not throw error');
    } catch (e) {
      assert.isTrue(true);
    }
  });

  it('should be able to create a shipment when manufactuer', async() => {
    await enroute.confirmShipment(shipHash, {from: manufacturer});
  });

  it('should not be able to shipment', async() => {
    try {
      await enroute.confirmShipment(shipHash, {from: manufacturer});
      assert.isTrue(false, 'transaction did not throw error');
    } catch(e) {
      assert.isTrue(true);
    }
  });

  xit('should be able to move along supply chain', async() => {
    assert.isTrue(false);
  });


  xit('should not let a user of wrong type confirm shipment', async() => {
    assert.isTrue(false);
  });

});
