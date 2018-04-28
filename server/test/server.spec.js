var request = require('supertest');
var server = require('../index.js');

describe('loading express', function () {
  it('responds to /sku', function testSlash(done) {
    request(server)
      .get('/sku')
      .expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/')
      .expect(404, done);
  });
});



