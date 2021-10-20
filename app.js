var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');
const passport=require('passport');
const MongoStore =require('connect-mongo');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gameRouter = require('./routes/games');
var app = express();
require("./module/passport-config")(passport)

// database setup
 const dbString ='mongodb://localhost:27017/game_site';
 const dbOptions ={
   useNewUrlParser: true,
   useUnifiedTopology: true
 }
 const connection= mongoose.connect(dbString, dbOptions)
 const sessionStore= MongoStore.create({
  mongoUrl: dbString
})
app.use(session({
  secret:'secret',
  resave:false,
  saveUninitialized:false,
  store:sessionStore
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

mongoose.connection.on('error', (err) => console.error(err));
mongoose.connection.once('open', () =>console.log('done!!'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false,limit: '10mb' }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/games',gameRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{error:`${err.status}`});
});

module.exports = app;
