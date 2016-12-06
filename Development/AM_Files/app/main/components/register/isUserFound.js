/**
 * Created by Ahmed Mater on 10/7/2016.
 */

var async = require('async');
var userServices = rootRequire('UserServices');
var ErrMsg = rootRequire('ErrorMessages');

module.exports = {
    go: function(req, res, next) {

        var userName = (req.query.userName) ? req.query.userName : null;
        var email = (req.query.email) ? req.query.email : null;

        async.series([
            function (RESTCallBack) {
                userServices.isUserFound(userName, email, RESTCallBack);
            }],
            function (err, results) {
                if(err != null)
                    res.status(400).send(err.message);
                else
                    res.status(200).send(results[0]);
            }
        );
    }
};