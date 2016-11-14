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

    selectQuery: function (attributes, fromTable, conditions, conditionsValue, orderBy, order, limit) {
        var SQL_Query = "SELECT ";

        for(var i=0; i<attributes.length; i++)
            SQL_Query += attributes[i] + ", ";

        SQL_Query = SQL_Query.substring(0, SQL_Query.length-2);

        SQL_Query += " FROM " + fromTable;
        if(conditions != null){
            SQL_Query += " WHERE ";

            for(var i=0; i<conditions.length; i++)
                SQL_Query += conditions[i] + " = '" + conditionsValue[i] + "' AND ";

            SQL_Query = SQL_Query.substring(0, SQL_Query.length-5);
        }

        SQL_Query += " ORDER BY " +  orderBy + order;
        return SQL_Query;
    },

    insertQuery: function (insertTable, attributes, attributesValue) {
        var SQL_Query = "Insert INTO " + insertTable + " (";

        for(var i=0; i<attributes.length; i++)
            SQL_Query += attributes[i] + ", ";

        SQL_Query = SQL_Query.substring(0, SQL_Query.length-2) + ") VALUES (";

        for(var i=0; i<attributesValue.length; i++)
            SQL_Query += attributesValue[i] + ", ";

        SQL_Query = SQL_Query.substring(0, SQL_Query.length-2) + ")";
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
