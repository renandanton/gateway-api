var factory = require('./../../../crud/factories/set');
var expected = require('./../../expected/set');
var fixture = require('./../../fixtures/set');
var expect = require('chai').expect;

describe('SET', function() {
  it('expect to return a set sql string', function() {
    var sql = factory.parse(fixture.set);
    expect(sql).to.equal(expected);
  });
});
