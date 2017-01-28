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

    for (var name in object[key]) {

        if (String(name).toLowerCase() == "$operator") {
          statement += operator.parse(object[key][name]);
        } else if (String(name).toLowerCase() == "$in") {
          statement += inn.parse(object[key][name]);
        } else if (String(name).toLowerCase() == "$nin") {
          statement += nin.parse(object[key][name]);
        } else if (String(name).toLowerCase() == "$like") {
          statement += like.parse(object[key][name]);
        } else if (String(name).toLowerCase() == "$between") {
          statement += between.parse(object[key][name]);
        } else if (String(name).toLowerCase() == "$gt") {
          statement += gt.parse(object[key][name]);
        } else if (String(name).toLowerCase() == "$gte") {
          statement += gte.parse(object[key][name]);
        } else if (String(name).toLowerCase() == "$lt") {
          statement += lt.parse(object[key][name]);
        } else if (String(name).toLowerCase() == "$lte") {
          statement += lte.parse(object[key][name]);
        } else if (String(name).toLowerCase() == "$neq") {
          statement += neq.parse(object[key][name]);
        } else if (String(name).toLowerCase() == "$eq") {
          statement += eq.parse(object[key][name]);
        } else {
          statement += property.parse(name, object[key]);
        }

    }

  }

  return statement;
};
