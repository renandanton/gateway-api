var property = require('./property');
var operator = require('./operator');
var inn = require('./in');
var nin = require('./nin');
var like = require('./like');
var between = require('./between');
var gt = require('./gt');
var gte = require('./gte');
var lt = require('./lt');
var lte = require('./lte');
var neq = require('./neq');
var eq = require('./eq');

module.exports.parse = function (object) {
  var statement = " WHERE ";

  for(var key in object) {

    if (String(key).toLowerCase() == "operator") {
      statement += operator.parse(object[key]);
    } else if (String(key).toLowerCase() == "in") {
      statement += inn.parse(object[key]);
    } else if (String(key).toLowerCase() == "nin") {
      statement += nin.parse(object[key]);
    } else if (String(key).toLowerCase() == "like") {
      statement += like.parse(object[key]);
    } else if (String(key).toLowerCase() == "between") {
      statement += between.parse(object[key]);
    } else if (String(key).toLowerCase() == "gt") {
      statement += gt.parse(object[key]);
    } else if (String(key).toLowerCase() == "gte") {
      statement += gte.parse(object[key]);
    } else if (String(key).toLowerCase() == "lt") {
      statement += lt.parse(object[key]);
    } else if (String(key).toLowerCase() == "lte") {
      statement += lte.parse(object[key]);
    } else if (String(key).toLowerCase() == "neq") {
      statement += neq.parse(object[key]);
    } else if (String(key).toLowerCase() == "eq") {
      statement += eq.parse(object[key]);
    } else {
      statement += property.parse(key, object);
    }

  }

  return statement;
};
