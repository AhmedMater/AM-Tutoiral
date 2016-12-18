var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/app'));
app.engine('.hbs', exphbs({defaultLayout: path.join(__dirname, '/app/api/common/layout/mainLayout') , extname: '.hbs'}));

app.use('/js', express.static(__dirname + '/public/javaScripts'));
app.use('/css', express.static(__dirname + '/public/stylesheets'));
app.use('/plugins', express.static(__dirname + '/public/plugins'));
app.use('/profile', express.static(__dirname + '/public/images/profile'));
app.use('/courses', express.static(__dirname + '/public/images/courses'));
app.use('/users', express.static(__dirname + '/public/images/users'));

app.set('view engine', 'hbs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var config = require('./app/api/common/javaScript/configuration');

// Overriding Require function
global.rootRequire = function(name) {
    var path = __dirname + '/app/' + config.Routes[name];
    return require(path);
};

// Overriding Render function
app.use( function( req, res, next ) {
    var _render = res.render;
    res.render = function( view, options, fn ) {
        //_.extend( options, {session: true} );
        var path = __dirname + '/app/' + config.Views[view];
        _render.call(this, path, options, fn);
    };
    next();
});

// Applying Sessions
var security = rootRequire('Security');
security.applySession(app);

// Open the Log file
var Logger = rootRequire('Logger');
Logger.openLogFile();

var routes = rootRequire('index-routes');
routes.routing(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error Handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  //res.render('error', {
  //  title: "Error",
  //  message: err.message,
  //  name: err.name,
  //  status: err.status,
  //  baseURL: req.originalUrl
  //});
    res.send(err.message);
});


module.exports = app;
