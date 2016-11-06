/**
 * Created by Ahmed Mater on 10/2/2016.
 */


var config = require('./configuration');
var exports = module.exports = {};

exports.routing = function(app){
    app.use('*/*', function(req, res, next){
        if(req.session.user != null){
            app.locals.isUserLoggedIn = true;
            app.locals.user = req.session.user;
        }
        next();
    });

    app.get(config.URL.home, function(req,res){
        var router = require('./' + config.Routes.home_get);
        router.go(req,res);
    });

    app.get(config.URL.login, function(req,res){
        var router = require('./' + config.Routes.login_get);
        router.go(req,res);
    });
    app.post(config.URL.login, function(req,res){
        var router = require('./' + config.Routes.login_post);
        router.go(req,res);
    });

    app.get(config.URL.register, function(req,res){
        var router = require('./' + config.Routes.register_get);
        router.go(req,res);
    });
    app.post(config.URL.register, function(req,res){
        var router = require('./' + config.Routes.register_post);
        router.go(req,res);
    });


    app.get(config.URL.userCheck, function(req,res){
        var router = require('./' + config.Routes.userNameCheck);
        router.go(req,res);
    });

    //app.get('/', function(req,res){
    //    var view = configParams.MAIN_PATH + '/home/home';
    //    var title = 'Home';
    //    home_get.go(req,res, title, view);
    //});
    //app.get('/register', function(req,res){
    //    var view = configParams.MAIN_PATH + '/register/register';
    //    var title = 'Register';
    //    register_get.go(req,res, title, view);
    //});
    //app.post('/register', function(req,res){
    //    register_post.go(req,res, user_Services, configParams);
    //});
    //app.get('/login', function(req,res){
    //    var view = configParams.MAIN_PATH + '/login/login';
    //    var title = 'Log in';
    //    login_get.go(req,res, title, view);
    //});
    //app.post('/login', function(req,res){
    //    login_post.go(req,res, user_Services, Sha256);
    //});
    //app.get('/forgetPassword', function(req,res){
    //    var result = req.query.result;
    //    var view;
    //
    //    if(result == configParams.FORGET_PASSWORD_SUCCESS)
    //        view = configParams.MAIN_PATH + '/user/forgetPassword/forgetPassword_Success';
    //    else if(result == configParams.FORGET_PASSWORD_FAIL)
    //        view = configParams.MAIN_PATH + '/user/forgetPassword/forgetPassword_Fail';
    //    else
    //        view = configParams.MAIN_PATH + '/user/forgetPassword/forgetPassword';
    //
    //    var title = 'Forget Password';
    //    forgetPassword_get.go(req,res, title, view, result, configParams);
    //});
    //app.post('/forgetPassword', function(req,res){
    //    forgetPassword_post.go(req,res, user_Services);
    //});
    //
    //app.get('/user/:userID/profile', function(req,res){
    //    var view = configParams.MAIN_PATH + '/user/profile';
    //    var title = 'Log in';
    //    profile_get.go(req,res, title, view);
    //});
    //app.get('/user/:userID/setting', function(req,res){
    //    var view = configParams.MAIN_PATH + '/user/setting';
    //    var title = 'Log in';
    //    setting_get.go(req,res, title, view);
    //});
    //app.post('/user/:userID/setting', function(req,res){
    //    setting_post.go(req,res, title, view);
    //});
    //app.get('/user/:userID/timeline', function(req,res){
    //    var view = configParams.MAIN_PATH + '/user/timeline';
    //    var title = 'Log in';
    //    timeline_get.go(req,res, title, view);
    //});
    //app.get('/user/:userID/notification', function(req,res){
    //    var view = configParams.MAIN_PATH + '/user/notification';
    //    var title = 'Log in';
    //    notification_get.go(req,res, title, view);
    //});


}
