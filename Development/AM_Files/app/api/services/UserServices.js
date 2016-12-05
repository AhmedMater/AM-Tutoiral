/**
 * Created by Ahmed Mater on 10/7/2016.
 */
var async = require('async');
var Regex = require('regex');

var UserRepository = rootRequire('UserRepository');
var LookupServices = rootRequire('LookupServices');

var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');
var SHA256 = rootRequire('SHA256');

module.exports = {
    applyUserValidation: function(userData){
        var fnName = "insertUserValidation";
        var RegExp = SystemParam.RegularExpression;

        if(userData.userName == null || userData.password == null || userData.confirmPassword == null ||
            userData.email == null || userData.firstName == null || userData.lastName == null || userData.gender == null) {
            Logger.error(SystemParam.SERVICES, fnName, ErrMsg.ERROR_1);
            return ErrMsg.createError(SystemParam.SERVER_ERROR, 400, ErrMsg.ERROR_1);
        }
        else if(!RegExp.userName.test(userData.userName)) {
            Logger.error(SystemParam.SERVICES, fnName, ErrMsg.ERROR_2);
            return ErrMsg.createError(SystemParam.SERVER_ERROR, 400, ErrMsg.ERROR_2);
        }
        else if(!RegExp.password.test(userData.password) || !RegExp.password.test(userData.confirmPassword)) {
            Logger.error(SystemParam.SERVICES, fnName, ErrMsg.ERROR_3);
            return ErrMsg.createError(SystemParam.SERVER_ERROR, 400, ErrMsg.ERROR_3);
        }
        else if(userData.password != userData.confirmPassword) {
            Logger.error(SystemParam.SERVICES, fnName, ErrMsg.ERROR_4);
            return ErrMsg.createError(SystemParam.SERVER_ERROR, 400, ErrMsg.ERROR_4);
        }
        else if(!RegExp.email.test(userData.email)) {
            Logger.error(SystemParam.SERVICES, fnName, ErrMsg.ERROR_5);
            return ErrMsg.createError(SystemParam.SERVER_ERROR, 400, ErrMsg.ERROR_5);
        }
        else if(!RegExp.name.test(userData.firstName)) {
            Logger.error(SystemParam.SERVICES, fnName, ErrMsg.ERROR_6);
            return ErrMsg.createError(SystemParam.SERVER_ERROR, 400, ErrMsg.ERROR_6);
        }
        else if(!RegExp.name.test(userData.lastName)) {
            Logger.error(SystemParam.SERVICES, fnName, ErrMsg.ERROR_7);
            return ErrMsg.createError(SystemParam.SERVER_ERROR, 400, ErrMsg.ERROR_7);
        }
        else if(!RegExp.gender.test(userData.gender)) {
            Logger.error(SystemParam.SERVICES, fnName, ErrMsg.ERROR_8);
            return ErrMsg.createError(SystemParam.SERVER_ERROR, 400, ErrMsg.ERROR_8);
        }
        else if(!RegExp.day_month.test(userData.dateOfBirth.day) || !RegExp.day_month.test(userData.dateOfBirth.month) || !RegExp.year.test(userData.dateOfBirth.year)
            || userData.dateOfBirth.day < 0 || userData.dateOfBirth.day > 31 || userData.dateOfBirth.month < 0 || userData.dateOfBirth.month > 12) {
            Logger.error(SystemParam.SERVICES, fnName, ErrMsg.ERROR_12);
            return ErrMsg.createError(SystemParam.SERVER_ERROR, 400, ErrMsg.ERROR_12)
        }
        else if(((userData.dateOfBirth.month == 4 || userData.dateOfBirth.month == 6 || userData.dateOfBirth.month == 9 || userData.dateOfBirth.month == 11) && (userData.dateOfBirth.day > 30) ) ||
            (userData.dateOfBirth.month == 2 && userData.dateOfBirth.day > 29)) {
            Logger.error(config.SystemParam.SERVICES, fnName, ErrMsg.ERROR_13);
            return ErrMsg.createError(SystemParam.SERVER_ERROR, 400, ErrMsg.ERROR_13);
        }
        else if(!RegExp.name.test(userData.job)) {
            Logger.error(SystemParam.SERVICES, fnName, ErrMsg.ERROR_9);
            return ErrMsg.createError(SystemParam.SERVER_ERROR, 400, ErrMsg.ERROR_9);
        }
        else if(!RegExp.name.test(userData.university)) {
            Logger.error(SystemParam.SERVICES, fnName, ErrMsg.ERROR_10);
            return ErrMsg.createError(SystemParam.SERVER_ERROR, 400, ErrMsg.ERROR_10);
        }
        else if(!RegExp.name.test(userData.college)) {
            Logger.error(SystemParam.SERVICES, fnName, ErrMsg.ERROR_11);
            return ErrMsg.createError(SystemParam.SERVER_ERROR, 400, ErrMsg.ERROR_11);
        }

        return null;
    },

    addNewUser: function(userData, RESTCallBack) {
        var fnName = "insertUser";

        var isError = module.exports.applyUserValidation(userData);

        if(isError != null)
            return RESTCallBack(isError, null);

        async.waterfall([
                function(ServiceCallBack) {
                    LookupServices.getUserRole_ByName(SystemParam.UserRole.USER, ServiceCallBack);
                },
                function(userRole, RepositoryCallBack) {
                    userData.password = SHA256.hash(userData.password);
                    userData.userRoleID = userRole.id;
                    UserRepository.insertUser(userData, RepositoryCallBack);
                }],
            function(err, result) {
                if(err != null)
                    Logger.error(SystemParam.SERVICES, fnName, err.message);

                RESTCallBack(err, result);
            }
        );
    },
    login: function(userName, password, RESTCallBack){
        var fnName = "login";

        if(userName == null || password == null) {
            Logger.error(SystemParam.SERVICES, fnName, ErrMsg.ERROR_1);
            return RESTCallBack(ErrMsg.createError(SystemParam.SERVER_ERROR, 400, ErrMsg.ERROR_1), null);
        }

        async.waterfall([
                function(callback) {
                    UserRepository.getUser(userName, SHA256.hash(password), callback);
                }],
            function(err, result) {
                if(err != null)
                    Logger.error(SystemParam.SERVICES,fnName,err.message);

                return RESTCallBack(err, result);
            }
        );
    },

    getUserByID: function(userID, RESTCallBack){
        var fnName = "getUserByID";

        if(userID == null) {
            Logger.error(SystemParam.SERVICES, fnName, 'User ID = null');
            return RESTCallBack(ErrMsg.createError(SystemParam.SERVER_ERROR, 400, 'User ID = null'), null);
        }

        async.waterfall([
                function(RepositoryCallBack) {
                    UserRepository.getUserByID(userID, RepositoryCallBack);
                }],
            function(err, result) {
                if(err != null)
                    Logger.error(SystemParam.SERVICES,fnName,err.message);

                return RESTCallBack(err, result);
            }
        );
    },

    isUserFound: function(userName, email, RESTCallBack){
        var fnName = "isUserFound";

        if(userName == null && email == null) {
            Logger.error(SystemParam.SERVICES, fnName, ErrMsg.ERROR_1);
            return RESTCallBack(ErrMsg.createError(SystemParam.SERVER_ERROR, 400, ErrMsg.ERROR_1), null);
        }

        async.waterfall([
                function(RepositoryCallBack) {
                    UserRepository.isUserFound(userName, email, RepositoryCallBack);
                }],
            function(err, result) {
                if(err != null)
                    Logger.error(SystemParam.SERVICES, fnName, err.message);

                RESTCallBack(err, result);
            }
        );

    }
};

