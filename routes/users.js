var express = require('express');
var Player = require('../module/player')
const bcrypt = require('bcrypt');
const { route } = require('.');
const passport = require('passport');
const router = express.Router();




/* GET users listing. */
router.get('/player', checkAuthenticated, function(req,  res, next) {
  res.render('users/player_page',{
    data:{
      title:`${req.user.name} wellcome`,
      name:`${req.user.name}`
      
    }
  });

});
router.get('/login',checkNotAuthenticated, function(req, res, next) {
  res.render('users/login', {
    data:{
      title: 'log-in page',
      name:`${0}`,
      password:`${0}`
    }
  });

});
router.get('/signup',checkNotAuthenticated, function(req, res, next) {
  res.render('users/signup', { title: 'signup page' ,player: new Player()});

});
router.post('/signup',checkNotAuthenticated, async function(req, res, next) {
  const hashedPassword = await bcrypt.hash(req.body.password,10)
  const player = new Player({
    email: req.body.email,
    name:req.body.username,
    password: hashedPassword
  });
  try{
    const newPlayer= await player.save();
    res.render('users/login',{
      data:{
        title: 'log-in page',
        name:`${newPlayer.name}`
      }
    });
  }
  catch(err){
    res.redirect('/signup',{
      title:'sign-in page'
    });
    alert('Error saving');
  }
});

router.post('/login',checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/users/player',
  failureRedirect: '/users/login',
  failureFlash: true
}))

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/users/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/player')
  }
  next()
}

module.exports = router;
