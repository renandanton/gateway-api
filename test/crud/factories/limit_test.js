var factory = require('./../../../crud/factories/limit');
var expected = require('./../../expected/limit');
var fixture = require('./../../fixtures/limit');
var expect = require('chai').expect;

describe('LIMIT', function() {
  it('expect to return um limit sql string', function() {
    var sql = factory.parse(fixture.limit);
    expect(sql).to.equal(expected);
  });
});
