module.exports.parse = function (object) {
  var statement = " GROUP BY ";

  statement += object.join();

  return statement;
};
