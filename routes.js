module.exports = function (app) {
  app.use('/cgs/gateway', require('./crud'));
};
