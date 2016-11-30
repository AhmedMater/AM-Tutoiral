/**
 * Created by Ahmed Mater on 10/7/2016.
 */
var config = rootRequire('configuration');
var async = require('async');
var Regex = require('regex');

var UserRepository = rootRequire('UserRepository');
var LookupService = rootRequire('LookupService');

var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');
var SHA256 = rootRequire('Sha256');

module.exports = {

    insertUser: function(userData, RESTCallBack) {
        var fnName = "insertUser";
        var RegExp = SystemParameters.RegularExpression;

        if(userData.userName == null || userData.password == null || userData.confirmPassword == null ||
            userData.email == null || userData.firstName == null || userData.lastName == null || userData.gender == null) {
            Logger.error(config.FOLDERS_NAMES.services, fnName, ErrMsg.ERROR_1);
            return RESTCallBack(ErrMsg.createError(ErrMsg.SERVER_ERROR, 400, ErrMsg.ERROR_1), null);
        }
        else if(!RegExp.userName.test(userData.userName)) {
            Logger.error(config.FOLDERS_NAMES.services, fnName, ErrMsg.ERROR_2);
            return RESTCallBack(ErrMsg.createError(ErrMsg.SERVER_ERROR, 400, ErrMsg.ERROR_2), null);
        }
        else if(!RegExp.password.test(userData.password) || !RegExp.password.test(userData.confirmPassword)) {
            Logger.error(config.FOLDERS_NAMES.services, fnName, ErrMsg.ERROR_3);
            return RESTCallBack(ErrMsg.createError(ErrMsg.SERVER_ERROR, 400, ErrMsg.ERROR_3), null);
        }
        else if(userData.password != userData.confirmPassword) {
            Logger.error(config.FOLDERS_NAMES.services, fnName, ErrMsg.ERROR_4);
            return RESTCallBack(ErrMsg.createError(ErrMsg.SERVER_ERROR, 400, ErrMsg.ERROR_4), null);
        }
        else if(!RegExp.email.test(userData.email)) {
            Logger.error(config.FOLDERS_NAMES.services, fnName, ErrMsg.ERROR_5);
            return RESTCallBack(ErrMsg.createError(ErrMsg.SERVER_ERROR, 400, ErrMsg.ERROR_5), null);
        }
        else if(!RegExp.name.test(userData.firstName)) {
            Logger.error(config.FOLDERS_NAMES.services, fnName, ErrMsg.ERROR_6);
            return RESTCallBack(ErrMsg.createError(ErrMsg.SERVER_ERROR, 400, ErrMsg.ERROR_6), null);
        }
        else if(!RegExp.name.test(userData.lastName)) {
            Logger.error(config.FOLDERS_NAMES.services, fnName, ErrMsg.ERROR_7);
            return RESTCallBack(ErrMsg.createError(ErrMsg.SERVER_ERROR, 400, ErrMsg.ERROR_7), null);
        }
        else if(!RegExp.gender.test(userData.gender)) {
            Logger.error(config.FOLDERS_NAMES.services, fnName, ErrMsg.ERROR_8);
            return RESTCallBack(ErrMsg.createError(ErrMsg.SERVER_ERROR, 400, ErrMsg.ERROR_8), null);
        }
        else if(!RegExp.day_month.test(userData.dateOfBirth.day) || !RegExp.day_month.test(userData.dateOfBirth.month) || !RegExp.year.test(userData.dateOfBirth.year)
            || userData.dateOfBirth.day < 0 || userData.dateOfBirth.day > 31 || userData.dateOfBirth.month < 0 || userData.dateOfBirth.month > 12) {
            Logger.error(config.FOLDERS_NAMES.services, fnName, ErrMsg.ERROR_12);
            return RESTCallBack(ErrMsg.createError(ErrMsg.SERVER_ERROR, 400, ErrMsg.ERROR_12), null);
        }
        else if(((userData.dateOfBirth.month == 4 || userData.dateOfBirth.month == 6 || userData.dateOfBirth.month == 9 || userData.dateOfBirth.month == 11) && (userData.dateOfBirth.day > 30) ) ||
            (userData.dateOfBirth.month == 2 && userData.dateOfBirth.day > 29)) {
            Logger.error(config.FOLDERS_NAMES.services, fnName, ErrMsg.ERROR_13);
            return RESTCallBack(ErrMsg.createError(ErrMsg.SERVER_ERROR, 400, ErrMsg.ERROR_13), null);
        }
        else if(!RegExp.name.test(userData.job)) {
            Logger.error(config.FOLDERS_NAMES.services, fnName, ErrMsg.ERROR_9);
            return RESTCallBack(ErrMsg.createError(ErrMsg.SERVER_ERROR, 400, ErrMsg.ERROR_9), null);
        }
        else if(!RegExp.name.test(userData.university)) {
            Logger.error(config.FOLDERS_NAMES.services, fnName, ErrMsg.ERROR_10);
            return RESTCallBack(ErrMsg.createError(ErrMsg.SERVER_ERROR, 400, ErrMsg.ERROR_10), null);
        }
        else if(!RegExp.name.test(userData.college)) {
            Logger.error(config.FOLDERS_NAMES.services, fnName, ErrMsg.ERROR_11);
            return RESTCallBack(ErrMsg.createError(ErrMsg.SERVER_ERROR, 400, ErrMsg.ERROR_11), null);
        }

        async.waterfall([
                function(ServiceCallBack) {
                    LookupService.getUserRole_ByName(SystemParameters.UserRole.name.USER, ServiceCallBack);
                },
                function(userRole, RepositoryCallBack) {
                    userData.password = SHA256.hash(userData.password);
                    userData.userRole = userRole.value;
                    UserRepository.insertUser(userData, RepositoryCallBack);
                }],
            function(err, result) {
                if(err != null)
                    Logger.error(config.FOLDERS_NAMES.service, fnName, err.message);

                RESTCallBack(err, result);
            }
        );
    },
    login: function(userName, password, RESTCallBack){

        if(userName == null || password == null) {
            Logger.error(config.FOLDERS_NAMES.services, "login", ErrMsg.ERROR_1);
            return RESTCallBack(ErrMsg.createError(ErrMsg.SERVER_ERROR, 400, ErrMsg.ERROR_11), null);
        }

        async.waterfall([
                function(callback) {
                    UserRepository.getUser(userName, SHA256.hash(password), callback);
                }],
            function(err, result) {
                if(err != null)
                    Logger.error(config.FOLDERS_NAMES.services,"login",err.message);

                return RESTCallBack(err, result);
            }
        );
    },
    isUserFound: function(userName, email, RESTCallBack){
        async.waterfall([
                function(RepositoryCallBack) {
                    UserRepository.isUserFound(userName, email, RepositoryCallBack);
                }],
            function(err, result) {
                if(err != null)
                    Logger.error(config.FOLDERS_NAMES.services, "isUserFound", err.message);

                RESTCallBack(err, result);
            }
        );

    }
};

