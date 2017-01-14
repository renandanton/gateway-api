var factorySelect = require('./../factories/select');
var factoryFrom = require('./../factories/from');
var factoryJoins = require('./../factories/joins');
var factoryGroup = require('./../factories/group');
var factoryHaving = require('./../factories/having');
var factoryWhere = require('./../factories/where');
var factoryOrder = require('./../factories/order');
var factoryLimit = require('./../factories/limit');
var validator = require('./../helpers/validator');
var cache = require('./../../config/adapters/redis');
var md5 = require('./../helpers/md5');

var Service = function (req, res, next) {
  try {

    var cached = req.header('cached');
    var query = req.body.query;
    var select = query.select;
    var from = query.from;
    var joins = query.joins;
    var group = query.group;
    var having = query.having;
    var where = query.where;
    var order = query.order;
    var limit = query.limit;

    validator.validate(select, "from_clause_not_present");
    validator.validate(from, "from_clause_not_present");

    var sql = factorySelect.parse(select);
    sql += factoryFrom.parse(from);

    if (joins) sql += factoryJoins.parse(joins);
    if (group) sql += factoryGroup.parse(group);
    if (having) sql += factoryHaving.parse(having);
    if (where) sql += factoryWhere.parse(where);
    if (order) sql += factoryOrder.parse(order);
    if (limit) sql += factoryLimit.parse(limit);

    console.log(sql);

    if (query) {
      req.getConnection(function (err, conn) {
        conn.query(sql, function (err, results) {
            if(err) return res.status(500).json(err);
            results = results.length == 1 ? results[0] : results;
            if (cached != "false") {
              cache.set(md5(JSON.stringify(req.body)), JSON.stringify(results));
              console.log('guardou o cache ....');
            }
            return res.status(200).json(results);
        });
      });
    } else {
      return res.status(422).json({
        message: 'query_not_present'
      });
    }
  } catch (err) {
    return res.status(422).json({ message: err.message });
  }
};

module.exports = Service;
