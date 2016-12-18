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
    var errMsg = [];

    //Check if the Password isn't equal to Username or email

    errMsg.push(Valid.userName(userData.userName));
    errMsg.push(Valid.password(userData.password));

    if(userData.password != userData.confirmPassword)
        errMsg.push(ErrMsg.PASSWORD_NOT_MATCH("Confirm Password", "Password"));

    errMsg.push(Valid.email(userData.email));
    errMsg.push(Valid.name(userData.firstName));
    errMsg.push(Valid.name(userData.lastName));
    errMsg.push(Valid.gender(userData.gender));
    errMsg.push(Valid.date(userData.dateOfBirth));

    var retMsg = null;

    if(errMsg != []) {
        retMsg = "<label class='text-danger'>" + errMsg[0] + "</label>";
        for (var i = 1; i < errMsg.length; i++)
            retMsg += " <br /> <label class='text-danger'>" + errMsg[i] + "</label>";
    }

    return retMsg;
};

exports.signUp = function(userData, RESTCallback){
    var fnName = "insertUser";

    var isError = applyUserValidation(userData);

    if(isError != null)
        return RESTCallback(ErrMsg.createError(SystemParam.SERVER_ERROR, isError), null);

    async.waterfall([
            function(ServiceCallback) {
                LookupServices.getUserRoleByName(SystemParam.UserRole.USER, ServiceCallback);
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

