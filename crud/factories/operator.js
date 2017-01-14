module.exports.parse = function (object) {
  statement = "";

  statement += String(object).toUpperCase() == "AND" ? " AND " : " OR ";

  return statement;
};
