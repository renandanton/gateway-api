var factory = require('./../../../crud/factories/order');
var expected = require('./../../expected/order');
var fixture = require('./../../fixtures/order');
var expect = require('chai').expect;

describe('ORDER BY', function() {
  it('expect to return a order by sql string', function() {
    var sql = factory.parse(fixture.order);
    expect(sql).to.equal(expected);
  });
  // it('expect to return throw error message', function() {
  //   var sql = factory.parse(fixture);
  //   expect(sql).throw(function (err) {
  //     console.log('oi');
  //     expect(err).to.equal('invalid non number parameter in limit clause');
  //   });
  // });
});
