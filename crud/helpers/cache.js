var cache = require('./../../config/adapters/redis');
var md5 = require('./md5');

cache.on('connect', function () {
  console.log('cache redis is ready ...');
});

cache.on('error', function (error) {
  console.log(error.message);
});

module.exports = function (req, res, next) {
  var hash = md5(JSON.stringify(req.body));
  var cached = req.header('cached');
  if (cached != "false") {
    cache.get(hash, function (err, reply) {
      if (err) res.status(500).json(err);
      console.log(reply);
      if (reply) {
        console.log('pegou do cache ...');
        return res.status(200).json(JSON.parse(reply));
      } else {
        next();
      }
    });
 } else {
   next();
 }
};
