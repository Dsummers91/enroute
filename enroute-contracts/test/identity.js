var Identity = artifacts.require("./Identity.sol");

contract("should work dammit", (accounts) => {
  let identity;
  let contractInterface = "0xdeadbeef";
  let contract = accounts[1];
  let user = accounts[0];

  before(async () => {
    identity = await Identity.new();
  })


  it("should be able to set an interface", async() => {
    await identity.setAddressInterface(contract, contractInterface);
    let iface = await identity.interfaces(contract);
    assert.equal(iface, contractInterface);
  });

  it("should be able to give access", async() => {
    await identity.setAccess(contract, accounts[0], true, 0, {from: contract});
    let hasAccess = await identity.getAccess(contract, user, 0);
    assert.isTrue(hasAccess);
  });

  it("should not have access for unset user", async() => {
    let hasAccess = await identity.getAccess(contract, accounts[2], 0);
    assert.isFalse(hasAccess);
  });

  it("should not have access for unset type", async() => {
    let hasAccess = await identity.getAccess(contract, user, 1);
    assert.isFalse(hasAccess);
  });
});
