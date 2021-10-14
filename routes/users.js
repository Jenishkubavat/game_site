var express = require('express');
var Player = require('../module/player')
const router = express.Router();
const bcrypt = require('bcrypt');
/* GET users listing. */
router.get('/',  function(req,  res, next) {
  res.send('respond with a resource');
});
router.get('/login', function(req, res, next) {
  res.render('users/login', { title: 'log-in page'});

});
router.get('/signup', function(req, res, next) {
  res.render('users/signup', { title: 'signup page' ,player: new Player()});

});
router.post('/profile', async function(req, res, next) {
  const hashedPassworld = await bcrypt.hash(req.body.Password,10)
  const player = new Player({
    email: req.body.Email,
    name:req.body.Username,
    password: hashedPassworld
  });
  try{
    const newPlayer= await player.save();
    res.render('users/player_page',{
      data:{
        title:`${newPlayer.name} wellcome`,
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

module.exports = router;
