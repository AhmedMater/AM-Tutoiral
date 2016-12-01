/**
 * Created by Ahmed Mater on 10/6/2016.
 */


var mysql = require('mysql');
var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');

var connection = mysql.createConnection(SystemParam.DB_INFO);

connection.connect(function(err) {
    if (err) {
        Logger.error("DB_Connection", "connect", err.message);
    }
    else {
        Logger.info("connect", "Connected to Database Successfully");
        console.log('Connected to Database Successfully.\n');
    }
});

module.exports = connection;
