var express = require('express');
var router = express.Router();

router.use('/_search', require('./helpers/cache'));

router.post('/_search', require('./services/search'));
router.post('/_insert', require('./services/insert'));
router.put('/_update', require('./services/update'));
router.delete('/_delete', require('./services/delete'));

module.exports = router;
