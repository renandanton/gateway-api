var factory = require('./../../../crud/factories/group');
var expected = require('./../../expected/group');
var fixture = require('./../../fixtures/group');
var expect = require('chai').expect;

describe('GROUP BY', function() {
  it('expect to return a group sql string', function() {
    var sql = factory.parse(fixture.group);
    expect(sql).to.equal(expected);
  });
});
