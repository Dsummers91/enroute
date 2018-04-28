var request = require('supertest');
var server = require('../index.js');
var assert = require('assert');

describe('loading express', function () {
  it('responds to /sku', function testSlash() {
    return request(server)
      .get('/sku')
      .expect(200)
			.then(response => {
          assert(response.body.length, 6);
      })
  });

	
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/')
      .expect(404, done);
  });

  after((done) => {
    server.close()
    done();
  });
});



