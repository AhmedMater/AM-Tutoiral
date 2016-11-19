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

// Applying Sessions
var security = require('./app/api/common/javaScript/Security');
security.applySession(app);

// Open the Log file
var Logger = require('./app/api/common/javaScript/Logger');
Logger.openLogFile();

var routes = require('./app/index-routes');
routes.routing(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render(path.join(__dirname, '/app/api/common/layout/error'), {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render(path.join(__dirname, '/app/api/common/layout/error'), {
    message: err.message,
    error: {}
  });
});


    module.exports = app;
//app.listen(3000, function() {
//    console.log('\nServer is running at localhost:3000');
//});

