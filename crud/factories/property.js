var type = require('./../helpers/type');

module.exports.parse = function (key, object) {
  var statement = "";
  statement += " "+ String(key) +" = ";
  statement += type.parse(object[key]);
  return statement;
};
