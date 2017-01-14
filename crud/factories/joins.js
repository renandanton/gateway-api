module.exports.parse = function (object) {
  var statement = " ";

  object.forEach(join => {
    statement += "INNER JOIN ";

    for (var table in join) {
      statement += String(table) + " ";
      for (var on in join[table]) {
        statement += String(on) +" "+ String(join[table][on]) + " ";
      }
    }

  });

  return statement;
};
