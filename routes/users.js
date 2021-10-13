var express = require('express');
var Player = require('../module/player')
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/login', function(req, res, next) {
   res.render('users/login', { title: 'log-in page' });

});
router.get('/signup', function(req, res, next) {
  res.render('users/signup', { title: 'signup page' ,Player: new Player()});

});


module.exports = router;
