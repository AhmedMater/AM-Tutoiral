/**
 * Created by Ahmed Mater on 10/6/2016.
 */


var mysql = require('mysql');
var exports = module.exports = {};

// Database Configuration
exports.connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'am'
});

exports.connection.connect(function(error) {
    if (error)
        console.log('Error when connecting to database. ' + error);
    else
        console.log('Connecting to database.\n');
});
