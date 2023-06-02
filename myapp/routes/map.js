var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('map', { title: 'Where in the world is CS?' });
});
module.exports = router;