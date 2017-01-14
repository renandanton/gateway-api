module.exports.parse = function (object) {
  var statement = "SELECT ";

  statement += object.join();

  return statement;
};
