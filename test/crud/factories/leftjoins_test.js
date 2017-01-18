var factory = require('./../../../crud/factories/leftjoins');
var expected = require('./../../expected/leftjoins');
var fixture = require('./../../fixtures/leftjoins');
var expect = require('chai').expect;

describe('LEFT JOIN', function() {
  it('expect to return a left join sql string', function() {
    var sql = factory.parse(fixture.leftjoins);
    expect(sql).to.equal(expected);
  });
});
