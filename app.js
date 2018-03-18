var express = require('express');
var minifyHTML = require('express-minify-html');
var compressor = require('node-minify');
var compression = require('compression')
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pry = require('pryjs')

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

if(process.env.NODE_ENV !== "production"){
  process.env.NODE_ENV = "dev";
}
console.log("NODE_ENV: " + process.env.NODE_ENV);

//minififies html code helping it to load faster
app.use(minifyHTML({
  override:      true,
  exception_url: false,
  htmlMinifier: {
      removeComments:            true,
      collapseWhitespace:        true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes:     true,
      removeEmptyAttributes:     true,
      minifyJS:                  true
  }
}));
if(process.env.NODE_ENV === "dev"){
  fs.watch('public/javascripts/app.js', function (event, filename) {
    console.log('event is: ' + event);
    if (event === "change") {
        compressor.minify({
        compressor: 'gcc',
        publicFolder: './public/',
        input: ['javascripts/app.js'],
        output: 'public/javascripts/app.min.js',
        callback: function (err, min) {}
      })
    }
  });
}


app.use(compression());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// exports = particles;
module.exports = app;
