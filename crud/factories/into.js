module.exports.parse = function (object) {

  var statement = "(";

  statement += object.join();

  statement += ")";

  return statement;
};
