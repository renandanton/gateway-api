module.exports.parse = function (object) {
  var statement = " ";

  object.forEach(ljoin => {
    statement += "LEFT JOIN ";

    for (var table in ljoin) {
      statement += String(table) + " ";
      for (var on in ljoin[table]) {
        statement += String(on) +" "+ String(ljoin[table][on]) + " ";
      }
    }

  });

  return statement;
};
