module.exports = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Acess-Control-Allow-Headers',
  'Content-Type, Authorization, X-Request, Content-Length, X-Requested-With, cached');
  res.header('Acess-Control-Allow-Methods', 'HEAD, GET, POST, PUT, DELETE, OPTIONS');
  next();
};
