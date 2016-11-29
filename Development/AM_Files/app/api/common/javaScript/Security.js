/**
 * Created by Ahmed Mater on 10/17/2016.
 */
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var session = require('express-session');

var SystemParam = rootRequire('SystemParameters');

module.exports = {
    generateToken: function(loginData) {
        return jwt.sign(loginData, SystemParam.SECRET_WORD);
    },

    validateToken: function (req) {
        var result = null;

        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
            result = req.headers.authorization.split(' ')[1];
        else if (req.session && req.session.token)
            result = req.session.token;

        return result;
    },

    applyJWT: function(){
        var unAuthenticatedURLs = ['/login'];
        return expressJWT({
            secret: SystemParam.SECRET_WORD,
            credentialsRequired: true
        }).unless({ path: unAuthenticatedURLs});
    },

    applySession: function(app){
        var sess = {
            cookie: { maxAge: (60000 * 24 * 30)},
            secret: SystemParam.SECRET_WORD,
            resave: true,
            saveUninitialized: true
        };

        if (app.get('env') === 'production') {
            app.set('trust proxy', 1); // trust first proxy
            sess.cookie.secure = true; // serve secure cookies
        }

        app.use(session(sess));
    }
};