var Identity = artifacts.require("./Identity.sol");

contract("should work dammit", (accounts) => {
  let identity;
  let contractInterface = "0xdeadbeef";

  before(async () => {
    identity = await Identity.new();
  })


  it("should be able to set an interface", async() => {
    await identity.setAddressInterface(accounts[1], contractInterface);
    let iface = await identity.interfaces(accounts[1]);
    assert.equal(iface, contractInterface);
  });

  xit("should be able to give acess", async() => {
    assert.isTrue(false);
  });


  xit("should be able to get access", async() => {
    assert.isTrue(false);
  });
});
