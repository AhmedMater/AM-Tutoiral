/**
 * Created by Ahmed Mater on 10/7/2016.
 */

var fs = require("fs");
var dateFormat = require('dateformat');
var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');

module.exports = {

    openLogFile: function(){
        fs.open(SystemParam.LogFilePath, 'r+', function(err, fd) {
            if (err) {
                return console.error(err);
            }
            exports.debug(SystemParam.Logger, "openLogFile", ErrMsg.INFO_0);
        });
    },

    debug: function(folder, fn_name, message) {
        var logMsg = SystemParam.AM_SYSTEM + " " + dateFormat(new Date(), SystemParam.datePattern) + " [Debug]: "
            + folder + " - " + fn_name + ": " + message + "\n";
        fs.appendFile(SystemParam.LogFilePath, logMsg, 'utf8');
    },

    info: function(fn_name, message) {
        var logMsg = SystemParam.AM_SYSTEM + " " + dateFormat(new Date(), SystemParam.datePattern) + " [Info]: "
            + fn_name + ": " + message + "\n";
        fs.appendFile(SystemParam.LogFilePath, logMsg, 'utf8');
    },

    error: function(folder, fn_name, errorMsg) {
        var logMsg = SystemParam.AM_SYSTEM + " " + dateFormat(new Date(), SystemParam.datePattern) + " [Error]: "
            + folder + " - " + fn_name + ": " + errorMsg + "\n";
        fs.appendFile(SystemParam.LogFilePath, logMsg, 'utf8');
    }
};