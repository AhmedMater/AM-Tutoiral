/**
 * Created by Ahmed Mater on 10/7/2016.
 */
var async = require('async');
var config = require('../../../configuration');
var userService = require('../../' + config.Services.User);
var exports = module.exports = {};

exports.go = function(req,res) {

    var userName = req.query.userName;
    var email = req.query.email;
    async.series([
        function(next) {
            userService.isUserFound(userName, email, next);
        }], function(err, result) {
        if(err != null)
            res.status(400).send(err);
        else
            res.status(200).send(result);
    });
};