var factory = require('./../../../crud/factories/where');
var expected_where = require('./../../expected/where');
var fixture_where = require('./../../fixtures/where');
var expected_where_eq = require('./../../expected/where_eq');
var fixture_where_eq = require('./../../fixtures/where_eq');
var expected_where_neq = require('./../../expected/where_neq');
var fixture_where_neq = require('./../../fixtures/where_neq');
var expected_where_gt = require('./../../expected/where_gt');
var fixture_where_gt = require('./../../fixtures/where_gt');
var expected_where_gte = require('./../../expected/where_gte');
var fixture_where_gte = require('./../../fixtures/where_gte');
var expected_where_lt = require('./../../expected/where_lt');
var fixture_where_lt = require('./../../fixtures/where_lt');
var expected_where_lte = require('./../../expected/where_lte');
var fixture_where_lte = require('./../../fixtures/where_lte');
var expected_where_and = require('./../../expected/where_operator_and');
var fixture_where_and = require('./../../fixtures/where_operator_and');
var expected_where_or = require('./../../expected/where_operator_or');
var fixture_where_or = require('./../../fixtures/where_operator_or');
var expect = require('chai').expect;

describe('WHERE', function() {
  it('expect to return a where attribute sql string', function() {
    var sql = factory.parse(fixture_where.where);
    expect(sql).to.equal(expected_where);
  });
  it('expect to return a where equal attribute sql string', function() {
    var sql = factory.parse(fixture_where_eq.where);
    expect(sql).to.equal(expected_where_eq);
  });
  it('expect to return a where not equal attribute sql string', function() {
    var sql = factory.parse(fixture_where_neq.where);
    expect(sql).to.equal(expected_where_neq);
  });
  it('expect to return a where great than attribute sql string', function() {
    var sql = factory.parse(fixture_where_gt.where);
    expect(sql).to.equal(expected_where_gt);
  });
  it('expect to return a where great than or equal attribute sql string', function() {
    var sql = factory.parse(fixture_where_gte.where);
    expect(sql).to.equal(expected_where_gte);
  });
  it('expect to return a where less than attribute sql string', function() {
    var sql = factory.parse(fixture_where_lt.where);
    expect(sql).to.equal(expected_where_lt);
  });
  it('expect to return a where less than or equal attribute sql string', function() {
    var sql = factory.parse(fixture_where_lte.where);
    expect(sql).to.equal(expected_where_lte);
  });
  it('expect to return a where operator AND sql string', function() {
    var sql = factory.parse(fixture_where_and.where);
    expect(sql).to.equal(expected_where_and);
  });
  it('expect to return a where operator OR sql string', function() {
    var sql = factory.parse(fixture_where_or.where);
    expect(sql).to.equal(expected_where_or);
  });
});
