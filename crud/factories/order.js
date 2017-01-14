var comma = require('./../helpers/comma');

module.exports.parse = function (object) {
  var statement = " ORDER BY ";

  for (var key in object) {
    statement += String(key) +" "+String(object[key]).toUpperCase() +", ";
  }

  statement = comma.parse(statement);

  return statement;
};
