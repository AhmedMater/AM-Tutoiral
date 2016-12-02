/**
 * Created by Ahmed Mater on 10/6/2016.
 */

var config = rootRequire('configuration');
var SystemParam = rootRequire('SystemParameters');
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
            function(err, user) {
                if(user != null) {

                    var session = req.session;
                    session.cookie.expires = false;
                    session.user = {
                        userID: user.userID,
                        userName: user.userName,
                        fullName: user.firstName + ' ' + user.lastName,
                        userPicName: user.userPic,
                        isAdmin: (user.userRole.name == SystemParam.UserRole.ADMIN)
                    };

                    res.redirect(config.URL.home);
                } else {
                    res.render('login_wrong', {
                        title: "Login"
                    });
                }
            }
        );
    }
};