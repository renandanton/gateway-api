module.exports.parse = function (object) {
  var statement = " ";

  object.forEach(rjoin => {
    statement += "RIGHT JOIN ";

    for (var table in rjoin) {
      statement += String(table) + " ";
      for (var on in rjoin[table]) {
        statement += String(on) +" "+ String(rjoin[table][on]) + " ";
      }
    }

  });

  return statement;
};
