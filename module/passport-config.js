const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
var User = require('../module/player')
module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'username',
        passwordField: 'password'
    },(username,password,done)=> {
                //match user
                User.findOne({name : username})
                .then((user)=>{
                 if(!user) {
                     return done(null,false,{message : 'that email is not registered'});
                 }
                 //match pass
                 bcrypt.compare(password,user.password,(err,isMatch)=>{
                     if(err) throw err;

                     if(isMatch) {
                         return done(null,user);
                     } else {
                         return done(null,false,{message : 'pass incorrect'});
                     }
                 })
                })
                .catch((err)=> {console.log(err)})
        })
        
    )
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
          User.findById(id,(err, user)=>{
          done(err, user) 
          console.log("hi")})
      })
}; 