module.exports.parse = function (object) {
  var statement = " LIMIT ";

  if (!Number.isInteger(object)) {
    throw "invalid non number parameter in limit clause"
  }

  statement += String(object)+" ";

  return statement;
};
