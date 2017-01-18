var factory = require('./../../../crud/factories/from');
var expected = require('./../../expected/from');
var fixture = require('./../../fixtures/from');
var expect = require('chai').expect;

describe('FROM', function() {
  it('expect to return a from sql string', function() {
    var sql = factory.parse(fixture.from);
    expect(sql).to.equal(expected);
  });
});
