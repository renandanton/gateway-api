module.exports.validate = function (object, string) {
  if (!object) {
    throw { message: string };
  }
};
