/**
 * Created by Ahmed Mater on 10/6/2016.
 */


var mysql = require('mysql');
var exports = module.exports = {
    connection: mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'am'
    }),

    selectQuery: function (attributes, fromTable, conditions, orderBy, order, limit) {
        var SQL_Query = "SELECT ";

        for(var i=0; i<attributes.length; i++)
            SQL_Query += attributes[i] + ", ";

        SQL_Query = SQL_Query.substring(0, SQL_Query.length-2);

        SQL_Query += " FROM " + fromTable;
        if(conditions != null){
            SQL_Query += " WHERE " + conditions[0].name + " = " + conditions[0].value;

            for(var i=1; i<conditions.length; i++)
                SQL_Query += conditions[i].logic + ' ' + conditions[i].name + " = " + conditions[i].value;

            SQL_Query = SQL_Query.substring(0, SQL_Query.length-5);
        }

        if(orderBy != null)
            SQL_Query += " ORDER BY " +  orderBy + order;

        return SQL_Query;
    },

    insertQuery: function (insertTable, attributes) {
        var SQL_Query = "Insert INTO " + insertTable + " (";
        var _attributes = "(";
        var values = "(";

        for(var i=0; i<attributes.length; i++) {
            _attributes += attributes[i].name + ", ";
            values += attributes[i].value + ", ";
        }

        SQL_Query = _attributes.substring(0, SQL_Query.length-2) + ") VALUES "
            + values.substring(0, SQL_Query.length-2) + ")";

        return SQL_Query;
    }
};

// Database Configuration
exports.connection =

exports.connection.connect(function(error) {
    if (error)
        console.log('Error when connecting to database. ' + error);
    else
        console.log('Connecting to database.\n');
});
