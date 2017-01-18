var factory = require('./../../../crud/factories/select');
var expected = require('./../../expected/select');
var fixture = require('./../../fixtures/select');
var expect = require('chai').expect;

describe('SELECT', function() {
  it('expect to return a select sql string', function() {
    var sql = factory.parse(fixture.select);
    expect(sql).to.equal(expected);
  });
});
