var operator = require('./operator');
var gt = require('./gt');
var gte = require('./gte');
var lt = require('./lt');
var lte = require('./lte');
var neq = require('./neq');
var eq = require('./eq');

module.exports.parse = function (object) {
  var statement = " HAVING ";

  for(var key in object) {

    if (String(key).toLowerCase() == "$operator") {
      statement += operator.parse(object[key]);
    } else if (String(key).toLowerCase() == "$gt") {
      statement += gt.parse(object[key]);
    } else if (String(key).toLowerCase() == "$gte") {
      statement += gte.parse(object[key]);
    } else if (String(key).toLowerCase() == "$lt") {
      statement += lt.parse(object[key]);
    } else if (String(key).toLowerCase() == "$lte") {
      statement += lte.parse(object[key]);
    } else if (String(key).toLowerCase() == "$neq") {
      statement += neq.parse(object[key]);
    } else if (String(key).toLowerCase() == "$eq") {
      statement += eq.parse(object[key]);
    } else {
      statement += " "+ String(key) +" = ";
      statement += type.parse(object[key]);
    }

  }

  return statement;
};
