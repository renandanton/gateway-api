var factory = require('./../../../crud/factories/rightjoins');
var expected = require('./../../expected/rightjoins');
var fixture = require('./../../fixtures/rightjoins');
var expect = require('chai').expect;

describe('RIGHT JOIN', function() {
  it('expect to return a right join sql string', function() {
    var sql = factory.parse(fixture.rightjoins);
    expect(sql).to.equal(expected);
  });
});
