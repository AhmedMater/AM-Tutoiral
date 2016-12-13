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

    //app.use('/admin/*', function(req, res, next){
    //    if(req.session.user != null){
    //        if(req.session.user.isAdmin)
    //            next();
    //        else{
    //            res.render('unAuthorized',{
    //                title: "Access Denied",
    //                baseURL: req.originalUrl
    //            });
    //        }
    //    } else {
    //        res.redirect(config.URL.login);
    //    }
    //});

    app.get(config.URL.test, function(req, res, next){
        var router = rootRequire('test_get');
        router.go(req,res, next);
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

    app.get(config.URL.newCourse, function(req, res, next){
        var router = rootRequire('newCourse_get');
        router.go(req, res, next);
    });
    app.post(config.URL.newCourse, function(req, res, next){
        var router = rootRequire('newCourse_post');
        router.go(req, res, next);
    });

    app.get(config.URL.newChapter, function(req, res, next){
        var router = rootRequire('newChapter_get');
        router.go(req, res, next);
    });
    app.post(config.URL.newChapter, function(req, res, next){
        var router = rootRequire('newChapter_post');
        router.go(req, res, next);
    });

    app.get(config.URL.newLesson, function(req, res, next){
        var router = rootRequire('newLesson_get');
        router.go(req, res, next);
    });
    app.post(config.URL.newCourse, function(req, res, next){
        var router = rootRequire('newLesson_post');
        router.go(req, res, next);
    });

    app.get(config.URL.isUserFound, function(req, res, next){
        var router = rootRequire('isUserFound');
        router.go(req, res, next);
    });
    app.get(config.URL.isCourseFound, function(req, res, next){
        var router = rootRequire('isCourseFound');
        router.go(req, res, next);
    });
    app.get(config.URL.isChapterFound, function(req, res, next){
        var router = rootRequire('isChapterFound');
        router.go(req, res, next);
    });
    app.get(config.URL.logout, function(req, res){
        req.session.user = null;
        res.redirect(config.URL.home);
    });

};
