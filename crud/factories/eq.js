var type = require('./../helpers/type');

module.exports.parse = function (object) {
  statement = "";
  for (var field in object) {
     statement += " "+ String(field) +" = ";
     statement += type.parse(object[field]);
  }
  return statement;
};
