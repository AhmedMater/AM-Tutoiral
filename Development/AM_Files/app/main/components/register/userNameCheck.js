/**
 * Created by Ahmed Mater on 10/7/2016.
 */

var config = configRequire();
var async = require('async');
var userService = serviceRequire('User');

module.exports = {
    go: function(req, res, next) {

        var userName = req.query.userName;
        var email = req.query.email;

        async.series([
            function (RESTCallBack) {
                userService.isUserFound(userName, email, RESTCallBack);
            }],
            function (err, result) {
                if(err != null)
                    next(err);
                else
                    res.status(200).send(result);
            }
        );
    }
};