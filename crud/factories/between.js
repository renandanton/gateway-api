module.exports.parse = function (object) {
  statement = "";

  for (var index in object) {
    statement += String(index) +" BETWEEN "
    statement += String(object[index][0]);
    statement += " AND ";
    statement += String(object[index][1]);
  }

  return statement;
};
