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
        try {
            Logger.debug(config.FOLDERS_NAMES.service,fn_names.insertUser,'Started');

            // Mandatory Fields in the Sign Up
            if(userData.user_name == null)
                throw new Exceptions.serviceException(fn_names.insertUser, "userName = null");
            else if(userData.password == null)
                throw new Exceptions.serviceException(fn_names.insertUser, "password = null");
            else if(userData.email == null)
                throw new Exceptions.serviceException(fn_names.insertUser, "email = null");
            else if(userData.first_name == null)
                throw new Exceptions.serviceException(fn_names.insertUser, "firstName = null");
            else if(userData.last_name == null)
                throw new Exceptions.serviceException(fn_names.insertUser, "lastName = null");
            else if(userData.gender == null)
                throw new Exceptions.serviceException(fn_names.insertUser, "gender = null");

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
                        Logger.error(config.FOLDERS_NAMES.service,fn_names.insertUser,err);
                }
            );
            Logger.debug(config.FOLDERS_NAMES.service,fn_names.insertUser,'Ended');
        } catch(e){
            Logger.error(config.FOLDERS_NAMES.service,fn_names.insertUser,e);
            console.log(e.message);
        }
    },
    login: function(userName, password, callback1){
        try{
            Logger.debug(config.FOLDERS_NAMES.service,fn_names.login,'Started');

            if(userName == null)
                throw new Exceptions.serviceException(fn_names.login, "userName = null");
            else if(password == null)
                throw new Exceptions.serviceException(fn_names.login, "password = null");

            async.waterfall([
                    function(callback) {
                        UserRepository.getUser(userName, SHA256.hash(password), callback);
                    }],
                function(err, result) {
                    if(err != null)
                        Logger.error(config.FOLDERS_NAMES.service,fn_names.login,err);

                    callback1(null, result);
                }
            );
            Logger.debug(config.FOLDERS_NAMES.service,fn_names.login,'Ended');
        } catch (e){
            Logger.error(config.FOLDERS_NAMES.service,fn_names.login,e);
        }
    },
    isUserFound: function(userName, email, next){
        try{
            Logger.debug(config.FOLDERS_NAMES.service,fn_names.isUserFound,'Started');

            async.waterfall([
                    function(callback) {
                        try{
                            UserRepository.isUserFound(userName, email, callback);
                        } catch (e){
                            Logger.error(config.FOLDERS_NAMES.service,fn_names.isUserFound,e);
                        }
                    }],
                function(err, result) {
                    if(err != null)
                        Logger.error(config.FOLDERS_NAMES.service,fn_names.isUserFound,err);

                    next(null, result);
                }
            );
            Logger.debug(config.FOLDERS_NAMES.service,fn_names.isUserFound,'Ended');
        } catch (e){
            Logger.error(config.FOLDERS_NAMES.service,fn_names.isUserFound,e);
        }
    }
};

