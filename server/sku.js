/// Just generates some random skus
web3 = new (require('web3'));
const number = 10;

function generateSkuList() {
  return new Promise((res, rej) => {
    let skus = [];
    for(let i = 0; i < number; i++) {
      skus.push(web3.sha3(Math.random()));
    }
    return res(skus);
  });
}

module.exports = {
  generateSkuList
}
