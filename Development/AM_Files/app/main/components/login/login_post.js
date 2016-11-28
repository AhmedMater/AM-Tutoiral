/**
 * Created by Ahmed Mater on 10/6/2016.
 */

var async = require('async');
var config = configRequire();
var userService = serviceRequire('User');

module.exports = {
    go: function(req, res, next) {
        var userName = req.body.userName;
        var password = req.body.password;

        async.waterfall([
            function(callback) {
                userService.login(userName, password, callback);
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