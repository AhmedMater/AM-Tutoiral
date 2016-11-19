/**
 * Created by Ahmed Mater on 10/7/2016.
 */
var config = require('../../configuration');
var async = require('async');

var UserRepository = require(config.Repository.User);
var LookupRepository = require(config.Repository.Lookup);

var Exceptions = require(config.Common.Exceptions);
var SHA256 = require(config.Common.Sha256);
var SystemParameters = require(config.Common.SystemParameters);
var Logger = require(config.Common.Logger);

var fn_names = {
    insertUser: "insertUser",
    login: "login",
    isUserFound: "isUserFound"
};

var exports = module.exports = {

    insertUser: function(userData) {

        // Mandatory Fields in the Sign Up
        if(userData.user_name == null || userData.password == null || userData.email == null || userData.first_name == null
            || userData.last_name == null || userData.gender == null)
            Logger.error(config.FOLDERS_NAMES.service,fn_names.insertUser,"Mandatory Field is null");

        var userRoleID = null;

        async.waterfall([
                function(callback) {
                    if (userData.user_role != null)
                        LookupRepository.getUserRole_byName(userData.user_role.name, callback);
                    else
                        LookupRepository.getUserRole_byName(SystemParameters.UserRole.USER, callback);
                },
                function(rows, callback) {
                    userRoleID = rows[0].id;

                    userData.password = SHA256.hash(userData.password);
                    UserRepository.insertUser(userData, callback);

                }],
            function(err, result) {
                if(err != null)
                    Logger.error(config.FOLDERS_NAMES.service,fn_names.insertUser,err.message);
            }
        );
    },
    login: function(userName, password, callback1){

        if(userName == null || password == null)
            Logger.error(config.FOLDERS_NAMES.service,fn_names.login,"Username or Password is null");

        async.waterfall([
                function(callback) {
                    UserRepository.getUser(userName, SHA256.hash(password), callback);
                }],
            function(err, result) {
                if(err != null)
                    Logger.error(config.FOLDERS_NAMES.service,fn_names.login,err.message);

                callback1(null, result);
            }
        );
    },
    isUserFound: function(userName, email, next){
        async.waterfall([
                function(callback) {
                    UserRepository.isUserFound(userName, email, callback);
                }],
            function(err, result) {
                if(err != null)
                    Logger.error(config.FOLDERS_NAMES.service,fn_names.isUserFound,err.message);

                next(null, result);
            }
        );

    }
};

