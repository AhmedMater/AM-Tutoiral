/**
 * Created by Ahmed Mater on 10/6/2016.
 */

var config = rootRequire('configuration');
var async = require('async');
var userServices = rootRequire('UserServices');

module.exports = {
    go: function(req, res, next) {

        var userData = {
            userName: (req.body.userName) ? req.body.userName : null,
            password: (req.body.password) ? req.body.password : null,
            confirmPassword: (req.body.confirmPassword) ? req.body.confirmPassword : null,
            firstName: (req.body.firstName) ? req.body.firstName : null,
            lastName: (req.body.lastName) ? req.body.lastName : null,
            email: (req.body.email) ? req.body.email : null,
            gender: (req.body.gender) ? req.body.gender : null,
            dateOfBirth: {
                day: (req.body.day) ? req.body.day : null,
                month: (req.body.month) ? req.body.month : null,
                year: (req.body.year) ? req.body.year : null
            },
            mailSubscribe: (req.body.mailSubscribe) ? true : false,

            userRole: (req.body.userRole) ? req.body.userRole : null,
            university: (req.body.university) ? req.body.university : null,
            college: (req.body.college) ? req.body.college : null,
            job: (req.body.job) ? req.body.job : null,
            country: (req.body.country) ? req.body.country : null,
            profilePic: (req.body.profilePic) ? req.body.profilePic : null,
            mobileNumber: (req.body.mobileNumber) ? req.body.mobileNumber : null
        };

        async.waterfall([
                function(RESTCallBack) {
                    userServices.insertUser(userData, RESTCallBack);
                }],
            function(err, result) {
                if(err != null)
                    next(err);
                else
                    res.redirect(config.URL.home);
            }
        );
    }
};

