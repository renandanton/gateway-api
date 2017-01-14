var factoryValues = require('./../factories/values');
var factoryInto = require('./../factories/into');
var validator = require('./../helpers/validator');

var Service = function (req, res, next) {

  var insert = req.body.insert;
  var table = insert.table;
  var into = insert.into;
  var values = insert.values;

  validator.validate(table, "table_not_present");
  validator.validate(values ,"values_not_present");

  var sql = "INSERT INTO "+ table +" ";
  sql += factoryInto.parse(into);
  sql += factoryValues.parse(values);

  console.log(sql);

  if (insert) {
    req.getConnection(function (err, conn) {
      conn.query(sql, function (err, results) {
          if(err) return res.status(500).json(err);
          if (results.length == 1) return res.status(200).json(results[0]);
          return res.status(200).json(results);
      });
    });
  } else {
    return res.status(422).json({
      message: 'insert_not_present'
    });
  }

};

module.exports = Service;
