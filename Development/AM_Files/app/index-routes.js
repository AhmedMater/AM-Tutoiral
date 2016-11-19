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
            app.locals.isAdmin = req.session.user.isAdmin;
        } else {
            app.locals.isUserLoggedIn = false;
            app.locals.user = null;
            app.locals.isAdmin = false;
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
    app.get(config.URL.logout, function(req, res){
        req.session.user = null;
        res.redirect(config.URL.home);
    });

}
