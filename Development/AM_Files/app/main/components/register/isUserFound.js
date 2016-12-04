/**
 * Created by Ahmed Mater on 10/7/2016.
 */

var async = require('async');
var userServices = rootRequire('UserServices');

module.exports = {
    go: function(req, res, next) {

        var userName = req.query.userName;
        var email = req.query.email;

        async.series([
            function (RESTCallBack) {
                userServices.isUserFound(userName, email, RESTCallBack);
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