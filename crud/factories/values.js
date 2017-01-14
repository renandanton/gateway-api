var comma = require('./../helpers/comma');

module.exports.parse = function (object) {
  var statement = " VALUES ";

  for(var i=0; i< object.length; i++) {
    statement += "(";

      object[i].forEach(elem => {
        if (typeof(elem) === "string") {
          statement += "\'"+ String(elem) +"\', ";
        } else {
          statement += elem +", ";
        }
      });

    statement = comma.parse(statement);

    if (i != (object.length - 1)) {
      statement += "), ";
    } else {
      statement += ")";
    }
  }

  return statement;
};
