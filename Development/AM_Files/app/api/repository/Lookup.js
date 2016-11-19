/**
 * Created by Ahmed Mater on 10/2/2016.
 */

var config = require('../../configuration');
var database = require(config.Repository._DBConnection).connection;
var Exceptions = require(config.Common.Exceptions);
var Logger = require(config.Common.Logger);

var fn_names = {
    getUserRole_byName: "getUserRole_byName",
    getAllUserRules: "getAllUserRules"
};

var exports = module.exports = {

    getAllUserRules: function(callback) {
        var query = 'SELECT * FROM lookup_data_type;';
        database.query(query, function (err, rows, fields) {
            if (err != null)
                Logger.error(config.FOLDERS_NAMES.repository,fn_names.getAllUserRules,err.message);

            console.log(rows);
            callback(null, rows);
        });
    },

    getUserRole_byName: function(name, callback) {

        if(name == null)
            Logger.error(config.FOLDERS_NAMES.repository, fn_names.getUserRole_byName, "Rule Name is null");


        var query = "SELECT * FROM lookup_user_role WHERE name = '" + name + "';";

        database.query(query, function(err,rows,fields){
            if(err != null)
                Logger.error(config.FOLDERS_NAMES.repository,fn_names.getUserRole_byName,err.message);

            var result;
            if (rows[0] != null) {
                result = {
                    roleID: rows[0].id,
                    roleName: rows[0].name,
                    roleDescription: rows[0].description
                };

                Logger.info(fn_names.getUserRole_byName, 'The Role is retrieved');
            } else {
                result = null;
                Logger.debug(config.FOLDERS_NAMES.repository, fn_names.getUserRole_byName, 'No such User Rule Found in Database');
            }

            callback(null, result);
        });
    }
};

//exports.getAllUserRules = function() {
//    var query = 'SELECT * FROM lookup_data_type;';
//    database.query(query, function(err,rows,fields){
//        if(err != null)
//            throw Exceptions.dbException('getAllUserRules', 'While getting all User Roles: ' + err);
//        else
//            return rows;
//    });
//}
//exports.getAllItemTypes = function() {
//    var query = 'SELECT * FROM lookup_item_type;';
//    database.query(query, function(err,rows,fields){
//        if(err != null)
//            throw Exceptions.dbException('getAllItemTypes', 'While getting all Item Types: ' + err);
//        else
//            return rows;
//    });
//}
//exports.getAllItemsDataTypes = function() {
//    var query = 'SELECT * FROM lookup_data_type;';
//    database.query(query, function(err,rows,fields){
//        if(err != null)
//            throw Exceptions.dbException('getAllDataTypes', 'While getting all Items Data Types: ' + err);
//        else
//            return rows;
//    });
//}
//
//exports.getItemDataType_byName = function(name) {
//    if(name == null)
//        throw Exceptions.dbException('getItemDataType_byName', 'Error: name = null');
//
//    var query = "SELECT * FROM lookup_data_type WHERE name = '" + name + "';";
//
//    database.query(query, function(err,rows,fields){
//        if(err != null)
//            throw Exceptions.dbException('getItemDataType_byName', 'While getting Item Data Type By Name: ' + err);
//
//        if(rows.length == 0)
//            throw Exceptions.dbException('getItemDataType_byName', 'No Item Data Type found with this name');
//        else
//            return rows;
//    });
//}
//exports.getItemType_byName = function(name) {
//    if(name == null)
//        throw Exceptions.dbException('getItemType_byName', 'Error: name = null');
//
//    var query = "SELECT * FROM lookup_item_type WHERE name = '" + name + "';";
//
//    database.query(query, function(err,rows,fields){
//        if(err != null)
//            throw Exceptions.dbException('getItemType_byName', 'While getting Item Type By Name: ' + err);
//
//        if(rows.length == 0)
//            throw Exceptions.dbException('getItemType_byName', 'No Item Type found with this name');
//        else
//            return rows;
//    });
//}
//
//exports.insertItemDataType = function(name, description) {
//    var query = 'INSERT INTO lookup_data_type (name';
//    if(description != null)
//        query +=', description';
//
//    query += ') VALUES (';
//
//    if(name != null)
//        query += name;
//    else
//        throw Exceptions.dbException('insertItemDataType', 'Error: name = null');
//
//    if(description != null)
//        query +=', ' + description;
//
//    query += ');'
//
//    database.query(query, function(err,rows,fields){
//        if(err != null) {
//            throw Exceptions.dbException('insertItemDataType', 'While Inserting new Item Data Type: ' + err);
//            return false;
//        } else {
//            console.log('Successfully Inserted new Item Data Type');
//            return true;
//        }
//    });
//}
//exports.insertItemType = function(name, description) {
//    var query = 'INSERT INTO lookup_item_type (name';
//    if(description != null)
//        query +=', description';
//
//    query += ') VALUES (';
//
//    if(name != null)
//        query += name;
//    else
//        throw Exceptions.dbException('insertItemType', 'Error: name = null');
//
//    if(description != null)
//        query +=', ' + description;
//
//    query += ');'
//
//    database.query(query, function(err,rows,fields){
//        if(err != null) {
//            throw Exceptions.dbException('insertItemType', 'While Inserting new Item Type: ' + err);
//            return false;
//        } else {
//            console.log('Successfully Inserted new Item Type');
//            return true;
//        }
//    });
//}
//exports.insertUserRole = function(name, description) {
//    var query = 'INSERT INTO lookup_user_role (name';
//    if(description != null)
//        query +=', description';
//
//    query += ') VALUES (';
//
//    if(name != null)
//        query += name;
//    else
//        throw Exceptions.dbException('insertUserRole', 'Error: name = null');
//
//    if(description != null)
//        query +=', ' + description;
//
//    query += ');'
//
//    database.query(query, function(err,rows,fields){
//        if(err != null) {
//            throw Exceptions.dbException('insertUserRole', 'While Inserting new UserRole: ' + err);
//            return false;
//        } else {
//            console.log('Successfully Inserted new User Role');
//            return true;
//        }
//    });
//}
