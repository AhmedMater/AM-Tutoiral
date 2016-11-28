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

// Manage API Libraries
global.serviceRequire = function(name) {
    return require(__dirname + '/app/api/services/' + name);
};
global.repositoryRequire = function(name) {
    return require(__dirname + '/app/api/repository/' + name);
};
global.commonJSRequire = function(name) {
    return require(__dirname + '/app/api/common/javaScript/' + name);
};

// Manage Main Libraries
global.adminRequire = function(name){
    return require(__dirname + '/app/main/admin/' + name);
};
global.componentsRequire = function(name){
    return require(__dirname + '/app/main/components/' + name);
};
global.coursesRequire = function(name){
    return require(__dirname + '/app/main/courses/' + name);
};
global.homeRequire = function(name){
    return require(__dirname + '/app/main/home/' + name);
};
global.userRequire = function(name){
    return require(__dirname + '/app/main/user/' + name);
};

global.configRequire = function(){
    return require(__dirname + '/app/configuration');
};
global.viewPath = function(name){
    return (__dirname + '/app/main/' + name);
};
global.DBConnectionRequire = function() {
    return require(__dirname + '/app/api/repository/_DBConnection').connection;
};

// Applying Sessions
var security = commonJSRequire('Security');
security.applySession(app);

// Open the Log file
var Logger = commonJSRequire('Logger');
Logger.openLogFile();

var routes = require('./app/index-routes');
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
  res.render(path.join(__dirname, '/app/api/common/layout/error'), {
    message: err.message,
    name: err.name,
    status: err.status,
    baseURL: req.originalUrl
  });
});


module.exports = app;
