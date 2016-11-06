/**
 * Created by Ahmed Mater on 10/6/2016.
 */

var async = require('async');
var app = require('express')();

var config = require('../../../configuration');
var userService = require('../../' + config.Services.User);
var exports = module.exports = {};

exports.go = function(req,res) {


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
                session.user = result;

                res.redirect(config.URL.home);
            } else {
                res.send('<h1> Wrong Password </h1>');
            }
        }
    );


}