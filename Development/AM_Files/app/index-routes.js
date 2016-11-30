/**
 * Created by Ahmed Mater on 10/2/2016.
 */

var config = rootRequire('configuration');
var exports = module.exports = {};

exports.routing = function(app){

    app.use('*/*', function(req, res, next){
        if(req.session.user != null){
            app.locals.isUserLoggedIn = true;
            app.locals.user = req.session.user;
            app.locals.isAdmin = req.session.user.isAdmin;
        } else {
            app.locals.isUserLoggedIn = false;
            app.locals.user = null;
            app.locals.isAdmin = false;
        }
        next();
    });

    app.get(config.URL.home, function(req, res, next){
        var router = rootRequire('home_get');
        router.go(req,res, next);
    });

    app.get(config.URL.login, function(req, res, next){
        var router = rootRequire('login_get');
        router.go(req, res, next);
    });
    app.post(config.URL.login, function(req, res, next){
        var router = rootRequire('login_post');
        router.go(req, res, next);
    });

    app.get(config.URL.register, function(req, res, next){
        var router = rootRequire('register_get');
        router.go(req, res, next);
    });
    app.post(config.URL.register, function(req, res, next){
        var router = rootRequire('register_post');
        router.go(req, res, next);
    });

    app.get(config.URL.addNewCourse, function(req, res, next){
        var router = rootRequire('addNewCourse_get');
        router.go(req, res, next);
    });
    app.post(config.URL.addNewCourse, function(req, res, next){
        var router = rootRequire('addNewCourse_post');
        router.go(req, res, next);
    });
    app.get(config.URL.addNewChapter, function(req, res, next){
        var router = rootRequire('addNewChapter_get');
        router.go(req, res, next);
    });
    app.post(config.URL.addNewChapter, function(req, res, next){
        var router = rootRequire('addNewChapter_post');
        router.go(req, res, next);
    });
    app.get(config.URL.addNewLesson, function(req, res, next){
        var router = rootRequire('addNewLesson_get');
        router.go(req, res, next);
    });
    app.post(config.URL.addNewCourse, function(req, res, next){
        var router = rootRequire('addNewLesson_post');
        router.go(req, res, next);
    });

    app.get(config.URL.userCheck, function(req, res, next){
        var router = rootRequire('userNameCheck');
        router.go(req, res, next);
    });
    app.get(config.URL.logout, function(req, res){
        req.session.user = null;
        res.redirect(config.URL.home);
    });

};
