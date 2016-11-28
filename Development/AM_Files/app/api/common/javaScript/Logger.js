/**
 * Created by Ahmed Mater on 10/7/2016.
 */

var fs = require("fs");
var dateFormat = require('dateformat');

var LogFilePath = 'C:\\AMPro\\log.txt';
var AM_SYSTEM = "AM-Logger";
var datePattern = "yyyy-mm-dd HH:MM:ss";

var exports = module.exports = {};
exports.openLogFile = function(){
    fs.open(LogFilePath, 'r+', function(err, fd) {
        if (err) {
            return console.error(err);
        }
        exports.debug("Logger", "openLogFile", "Logger File Opened Successfully");
    });
};

exports.debug = function(folder, fn_name, message) {
    var logMsg = AM_SYSTEM + " " + dateFormat(new Date(), datePattern) + " [Debug]: "
        + folder + " - " + fn_name + ": " + message + "\n";
    fs.appendFile(LogFilePath, logMsg, 'utf8');
};

exports.info = function(fn_name, message) {
    var logMsg = AM_SYSTEM + " " + dateFormat(new Date(), datePattern) + " [Info]: "
        + fn_name + ": " + message + "\n";
    fs.appendFile(LogFilePath, logMsg, 'utf8');
};

exports.error = function(folder, fn_name, errorMsg) {
    var logMsg = AM_SYSTEM + " " + dateFormat(new Date(), datePattern) + " [Error]: "
        + folder + " - " + fn_name + ": " + errorMsg + "\n";
    fs.appendFile(LogFilePath, logMsg, 'utf8');
};