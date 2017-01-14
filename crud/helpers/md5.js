var crypto = require('crypto');

module.exports = function (string) {

  hash = crypto.createHash('md5').update(string).digest('hex');

  return hash;
};
