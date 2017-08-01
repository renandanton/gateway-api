var factorySelect = require('./../factories/select');
var factoryFrom = require('./../factories/from');
var factoryJoins = require('./../factories/joins');
var factoryLeftJoins = require('./../factories/leftjoins');
var factoryRightJoins = require('./../factories/rightjoins');
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
    var leftjoins = query.leftjoins;
    var rightjoins = query.rightjoins;
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
    if (leftjoins) sql += factoryLeftJoins.parse(leftjoins);
    if (rightjoins) sql += factoryRightJoins.parse(rightjoins);
    if (group) sql += factoryGroup.parse(group);
    if (having) sql += factoryHaving.parse(having);
    if (where) sql += factoryWhere.parse(where);
    if (order) sql += factoryOrder.parse(order);
    if (limit) sql += factoryLimit.parse(limit);

    if (query) {
      req.getConnection(function (err, conn) {
        conn.query(sql, function (err, results) {
            if(err) return res.status(500).json(err);
            results = results.length == 1 ? results[0] : results;
            if (cached != "false") {
              var key = md5(JSON.stringify(req.body));
              cache.set(key, JSON.stringify(results));
              cache.expireat(key, 10);
              console.log('cache kept..');
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
