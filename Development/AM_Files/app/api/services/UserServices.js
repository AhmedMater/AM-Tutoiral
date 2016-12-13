/**
 * Created by Ahmed Mater on 10/7/2016.
 */
var async = require('async');
var Regex = require('regex');

var UserRepository = rootRequire('UserRepository');
var LookupServices = rootRequire('LookupServices');

var SystemParam = rootRequire('SystemParameters');
var Valid = rootRequire('Validation');
var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');
var SHA256 = rootRequire('SHA256');

var exports = module.exports = {};

var applyUserValidation = function(userData){
    var errMsg = null;

    errMsg = Valid.userName(userData.userName);
    if(errMsg != null)
        return errMsg;

    errMsg = Valid.password(userData.password);
    if(errMsg != null)
        return errMsg;

    if(userData.password != userData.confirmPassword)
        return ErrMsg.error_7_PasswordNotMatch("Password and Confirm Password");
    else if(userData.password == userData.userName)
        return ErrMsg.ERROR_8_PasswordEQUserName;

    errMsg = Valid.email(userData.email);
    if(errMsg != null)
        return errMsg;

    errMsg = Valid.name(userData.firstName);
    if(errMsg != null)
        return errMsg;

    errMsg = Valid.name(userData.lastName);
    if(errMsg != null)
        return errMsg;

    errMsg = Valid.gender(userData.gender);
    if(errMsg != null)
        return errMsg;

    errMsg = Valid.date(userData.dateOfBirth);
    if(errMsg != null)
        return errMsg;

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
};

exports.addNewUser = function(userData, RESTCallback) {
    var fnName = "insertUser";

    var isError = applyUserValidation(userData);

    if(isError != null)
        return RESTCallback(isError, null);

    async.waterfall([
            function(ServiceCallback) {
                LookupServices.getUserRole_ByName(SystemParam.UserRole.USER, ServiceCallback);
            },
            function(userRole, RepositoryCallback) {
                userData.password = SHA256.hash(userData.password);
                userData.userRoleID = userRole.id;
                UserRepository.insertUser(userData, RepositoryCallback);
            }],
        function(err, succeeded) {
            if(err != null)
                Logger.error(SystemParam.SERVICES, fnName, err.message);

            if(succeeded)
                RESTCallback(err, succeeded);
            else
                RESTCallback(ErrMsg.createError(SystemParam.SERVICE_, 400, "Failed to Add New User"))
        }
    );
};
exports.login = function(userName, password, RESTCallback){
    var fnName = "login";

    if(userName == null || password == null) {
        Logger.error(SystemParam.SERVICES, fnName, ErrMsg.ERROR_1);
        return RESTCallback(ErrMsg.createError(SystemParam.SERVER_ERROR, 400, ErrMsg.ERROR_1), null);
    }

    async.waterfall([
            function(callback) {
                UserRepository.selectUserByLoginData(userName, SHA256.hash(password), callback);
            }],
        function(err, result) {
            if(err != null)
                Logger.error(SystemParam.SERVICES,fnName,err.message);

            return RESTCallback(err, result);
        }
    );
};

exports.getUserByID = function(userID, RESTCallback){
    var fnName = "getUserByID";

    if(userID == null) {
        Logger.error(SystemParam.SERVICES, fnName, 'User ID = null');
        return RESTCallback(ErrMsg.createError(SystemParam.SERVER_ERROR, 400, 'User ID = null'), null);
    }

    async.waterfall([
            function(RepositoryCallback) {
                UserRepository.getUserByID(userID, RepositoryCallback);
            }],
        function(err, result) {
            if(err != null)
                Logger.error(SystemParam.SERVICES,fnName,err.message);

            return RESTCallback(err, result);
        }
    );
};

exports.isUserFound = function(userName, email, RESTCallback){
    var fnName = "isUserFound";

    if(userName == null && email == null) {
        Logger.error(SystemParam.SERVICES, fnName, ErrMsg.ERROR_1);
        return RESTCallback(ErrMsg.createError(SystemParam.SERVER_ERROR, 400, ErrMsg.ERROR_1), null);
    }

    async.waterfall([
            function(RepositoryCallback) {
                UserRepository.isUserFound(userName, email, RepositoryCallback);
            }],
        function(err, result) {
            if(err != null)
                Logger.error(SystemParam.SERVICES, fnName, err.message);

            RESTCallback(err, result);
        }
    );

};
exports.isUserAdmin = function(userID, RESTCallback){
    var fnName = "isUserAdmin";

    if(userID == null) {
        Logger.error(SystemParam.SERVICES, fnName, 'userID can\'t be null');
        return RESTCallback(ErrMsg.createError(SystemParam.SERVER_ERROR, 400, 'userID can\'t be null'), null);
    }

    async.waterfall([
            function(RepositoryCallback) {
                UserRepository.getUserByID(userID, RepositoryCallback);
            }],
        function(err, user) {
            if(err != null)
                Logger.error(SystemParam.SERVICES, fnName, err.message);

            var isAdmin = (user.userRole.name == SystemParam.UserRole.ADMIN);

            return RESTCallback(err, isAdmin);
        }
    );
};

