var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/doodler', function(req, res, next) {
  res.render('games/doodler', { title: 'game-site' });
});

module.exports = router;
