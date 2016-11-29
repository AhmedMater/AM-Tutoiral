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

var applicationRoutes = {
    "AM-Database": "api/repository/_DBConnection",
    "configuration": "configuration",
    "index-routes": "index-routes",

    "UserRepository": "api/repository/UserRepository",
    "LookupRepository": "api/repository/LookupRepository",
    "CourseRepository": "api/repository/CourseRepository",
    "ArticleRepository": "api/repository/ArticleRepository",
    "QuestionRepository": "api/repository/QuestionRepository",
    "UserServices": "api/repository/UserServices",
    "CourseServices": "api/repository/CourseServices",
    "ArticleServices": "api/repository/ArticleServices",
    "QuestionServices": "api/repository/QuestionServices",
    "ErrorMessages": "api/common/javaScript/ErrorMessages",
    "Security": "api/common/javaScript/Security",
    "SHA256": "api/common/javaScript/SHA256",
    "SystemParameters": "api/common/javaScript/SystemParameters",
    "Logger": "api/common/javaScript/Logger",

    "addNewCourse_get": "main/admin/course/addNewCourse/addNewCourse_get",
    "addNewCourse_post": "main/admin/course/addNewCourse/addNewCourse_post",
    "addNewChapter_get": "main/admin/course/addNewChapter/addNewChapter_get",
    "addNewChapter_post": "main/admin/course/addNewChapter/addNewChapter_post",
    "addNewLesson_get": "main/admin/course/addNewLesson/addNewLesson_get",
    "addNewLesson_post": "main/admin/course/addNewLesson/addNewLesson_post",
    "addNewArticle_get": "main/admin/article/addNewArticle/addNewArticle_get",
    "addNewArticle_post": "main/admin/article/addNewArticle/addNewArticle_post",

    "forgetPassword_get": "main/components/forgetPassword/forgetPassword_get",
    "forgetPassword_post": "main/components/forgetPassword/forgetPassword_post",
    "login_get": "main/components/login/login_get",
    "login_post": "main/components/login/login_post",
    "register_get": "main/components/register/register_get",
    "register_post": "main/components/register/register_post",
    "home_get": "main/home/home_get",
    "home_post": "main/home/home_post"
};

var applicationViews = {
    "error": "api/common/layout/error",
    "home": "main/home/home"
};

// Overriding Require function
global.rootRequire = function(name) {
    var path = __dirname + '/app/' + applicationRoutes[name];
    return require(path);
};

// Overriding Render function
app.use( function( req, res, next ) {
    var _render = res.render;
    res.render = function( view, options, fn ) {
        //_.extend( options, {session: true} );
        var path = __dirname + '/app/' + applicationViews[view];
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
  res.render('error', {
    message: err.message,
    name: err.name,
    status: err.status,
    baseURL: req.originalUrl
  });
});


module.exports = app;
