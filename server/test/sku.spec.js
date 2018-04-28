let sku = require('../sku.js');
const assert = require('assert');

describe('Sku', () => {
  it('should generate a list of skus', async() => {
    let skus = await sku.generateSkuList()
    return assert.equal(skus.length, 10);
  });

});
