var factory = require('./../../../crud/factories/joins');
var expected = require('./../../expected/joins');
var fixture = require('./../../fixtures/joins');
var expect = require('chai').expect;

describe('INNER JOIN', function() {
  it('expect to return a inner join sql string', function() {
    var sql = factory.parse(fixture.joins);
    expect(sql).to.equal(expected);
  });
});
