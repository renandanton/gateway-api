var factorySet = require('./../factories/set');
var factoryWhere = require('./../factories/where');
var validator = require('./../helpers/validator');

var Service = function (req, res, next) {
  try {
    var update = req.body.update;
    var table = req.body.update.table;
    var set = req.body.update.set;
    var where = req.body.update.where;

    sql = "UPDATE "+ String(table) +" ";
    sql += factorySet.parse(set);
    sql += factoryWhere.parse(where);

    console.log(sql);

    validator.validate(table, "table_clause_not_present");
    validator.validate(set, "set_clause_not_present");
    validator.validate(where, "where_clause_not_present");

    if (update) {
      req.getConnection(function (err, conn) {
        conn.query(sql, function (err, results) {
            if(err) return res.status(500).json(err);
            if (results.length == 1) return res.status(200).json(results[0]);
            return res.status(200).json(results);
        });
      });
    } else {
      return res.status(422).json({
        message: "update_not_present"
      });
    }
} catch (err) {
  return res.status(422).json({ message: err });
}

};

module.exports = Service;
