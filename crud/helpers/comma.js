module.exports.parse = function (object) {

  if (! typeof(object) == "string") {
    throw "object_is_not_a_string";
  }

  if (object.endsWith(', ')) {
    // remove right whites spaces in string
    object =  object.replace(/\s+$/g, '');
    // remove last comma character
    object = object.substr(0, (object.length - 1));
  }

  return object;
};
