var comma = require('./../helpers/comma');

module.exports.parse = function (object) {
  var statement = "SET";

  for(var key in object) {
    statement += " "+ String(key) +"=";

    if (typeof(object[key]) === "string") {
      statement += "\'"+ String(object[key]) +"\', ";
    } else {
      statement += object[key] +", ";
    }
  }

  statement = comma.parse(statement);

  return statement;
};
