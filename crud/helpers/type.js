var comma = require('./../helpers/comma');

module.exports.parse = function (object, bool=true) {
  if (typeof(object) === "string") {
    object = "\'"+ String(object) +"\', ";
  } else {
    object = String(object) +", ";
  }

  if (bool) {
    object = comma.parse(object);
  }

  return object;
};
