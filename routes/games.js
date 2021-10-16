var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/doodler', function(req, res, next) {
  res.render('games/doodler', { title: 'game-site' });
});
router.get('/ping_pong', function(req, res, next) {
  res.render('games/ping_pong', { title: 'game-site' });
});

module.exports = router;
