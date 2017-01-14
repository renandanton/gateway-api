var redisOptions = {
  host: 'redis',
  port: 6379
};

var redis = require('redis').createClient(redisOptions);

module.exports = redis;
