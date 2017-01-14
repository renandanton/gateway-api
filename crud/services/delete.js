var factoryFrom = require('./../factories/from');
var factoryWhere = require('./../factories/where');
var validator = require('./../helpers/validator');

var Service = function (req, res, next) {
  try {
    var del = req.body.delete;
    var from = req.body.delete.from;
    var where = req.body.delete.where;

    validator.validate(from, "from_clause_not_present");
    validator.validate(where, "where_claouse_not_present");

    var sql = "DELETE ";
    sql += factoryFrom.parse(from);
    sql += factoryWhere.parse(where);

    console.log(sql);

    if (del) {
      req.getConnection(function (err, conn) {
        conn.query(sql, function (err, results) {
            if(err) return res.status(500).json(err);
            if (results.length == 1) return res.status(200).json(results[0]);
            return res.status(200).json(results);
        });
      });
    } else {
      return res.status(422).json({
        message: "delete_not_present"
      });
    }
} catch (err) {
  return res.status(422).json({ message: err });
}

};

module.exports = Service;
