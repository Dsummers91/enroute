var request = require('supertest');
var server = require('../index.js');
var assert = require('assert');

describe('loading express', function () {
  let skus, shipHash;

  it('responds to /sku', function testSlash() {
    return request(server)
      .get('/sku')
      .expect(200)
			.then(response => {
          assert(response.body.length, 6);
      })
  });

	
  it('receives identity contract', () => {
    return request(server)
      .get('/enroute/identity')
      .expect(200)
			.then(response => {
          assert(response.body.id != null, true);
      })
  });

  it('should return an error for nonactor', () => {
    return request(server)
      .post('/process')
      .send({'actor': 'faker'})
      .set('Accept', /application\/json/)
      .expect(200)
			.then(response => {
          assert(response.body.error,'actor does not exist! [manufacturer, deliveryTruck, superMarket]');
      })
  });

  it('should be able get manufacturer', () => {
    return request(server)
      .post('/process')
      .send({'actor': 'faker'})
      .set('Accept', /application\/json/)
      .expect(200)
			.then(response => {
          assert(response.body.error,'actor does not exist! [manufacturer, deliveryTruck, superMarket]');
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



