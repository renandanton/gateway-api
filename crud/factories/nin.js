var comma = require('./../helpers/comma');
var type = require('./../helpers/type');

module.exports.parse = function (object) {
  statement = "";

  for (var field in object) {
    statement += String(field) +" NOT IN "
    statement += "(";
    object[field].forEach(el => {
      statement += type.parse(el, false);
    });
    statement = comma.parse(statement);
    statement += ") ";
  }

  return statement;
};
