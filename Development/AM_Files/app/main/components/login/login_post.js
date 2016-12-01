/**
 * Created by Ahmed Mater on 10/6/2016.
 */

var config = rootRequire('configuration');
var async = require('async');
var userServices = rootRequire('UserServices');

module.exports = {
    go: function(req, res, next) {
        var userName = req.body.userName;
        var password = req.body.password;

        async.waterfall([
            function(RESTCallBack) {
                userServices.login(userName, password, RESTCallBack);
            }],
            function(err, result) {
                if(result != null) {

                    var session = req.session;
                    session.cookie.expires = false;
                    session.user = {
                        userID: result.userID,
                        userName: result.userName,
                        fullName: result.firstName + ' ' + result.lastName,
                        userPicName: result.userPic,
                        isAdmin: (result.userRole.roleName == 'Admin')
                    };

                    res.redirect(config.URL.home);
                } else {
                    res.send('<h1> Wrong Password </h1>');
                }
            }
        );
    }
};