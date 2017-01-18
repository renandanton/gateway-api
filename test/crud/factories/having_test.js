var factory = require('./../../../crud/factories/having');
var expected = require('./../../expected/having');
var fixture = require('./../../fixtures/having');
var expect = require('chai').expect;

describe('HAVING', function() {
  it('expect to return a having sql string', function() {
    var sql = factory.parse(fixture.having);
    expect(sql).to.equal(expected);
  });
});
