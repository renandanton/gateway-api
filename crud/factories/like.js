var comma = require('./../helpers/comma');

module.exports.parse = function (object) {
  statement = "";

  for (var field in object) {
    statement += String(field) +" LIKE "
    statement += "\'";
    statement += String(object[field]);
    statement = comma.parse(statement);
    statement += "\' ";
  }

  return statement;
};
