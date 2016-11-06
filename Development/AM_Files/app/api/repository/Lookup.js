/**
 * Created by Ahmed Mater on 10/2/2016.
 */

var exports = module.exports = {};

exports.getAllUserRules = function() {
    var query = 'SELECT * FROM lookup_data_type;';
    DB.query(query, function(err,rows,fields){
        if(err != null)
            throw Exceptions.dbException('getAllUserRules', 'While getting all User Roles: ' + err);
        else
            return rows;
    });
}
exports.getAllItemTypes = function() {
    var query = 'SELECT * FROM lookup_item_type;';
    DB.query(query, function(err,rows,fields){
        if(err != null)
            throw Exceptions.dbException('getAllItemTypes', 'While getting all Item Types: ' + err);
        else
            return rows;
    });
}
exports.getAllItemsDataTypes = function() {
    var query = 'SELECT * FROM lookup_data_type;';
    DB.query(query, function(err,rows,fields){
        if(err != null)
            throw Exceptions.dbException('getAllDataTypes', 'While getting all Items Data Types: ' + err);
        else
            return rows;
    });
}

exports.getItemDataType_byName = function(name) {
    if(name == null)
        throw Exceptions.dbException('getItemDataType_byName', 'Error: name = null');

    var query = "SELECT * FROM lookup_data_type WHERE name = '" + name + "';";

    DB.query(query, function(err,rows,fields){
        if(err != null)
            throw Exceptions.dbException('getItemDataType_byName', 'While getting Item Data Type By Name: ' + err);

        if(rows.length == 0)
            throw Exceptions.dbException('getItemDataType_byName', 'No Item Data Type found with this name');
        else
            return rows;
    });
}
exports.getItemType_byName = function(name) {
    if(name == null)
        throw Exceptions.dbException('getItemType_byName', 'Error: name = null');

    var query = "SELECT * FROM lookup_item_type WHERE name = '" + name + "';";

    DB.query(query, function(err,rows,fields){
        if(err != null)
            throw Exceptions.dbException('getItemType_byName', 'While getting Item Type By Name: ' + err);

        if(rows.length == 0)
            throw Exceptions.dbException('getItemType_byName', 'No Item Type found with this name');
        else
            return rows;
    });
}
exports.getUserRole_byName = function(name, callback) {
    if(name == null)
        throw Exceptions.dbException('getUserRole_byName', 'Error: name = null');

    var query = "SELECT * FROM lookup_user_role WHERE name = '" + name + "';";

    DB.query(query, function(err,rows,fields){
        if(err != null)
            throw Exceptions.dbException('getUserRole_byName', 'While getting User Role By Name: ' + err);

        if(rows.length == 0)
            throw Exceptions.dbException('getUserRole_byName', 'No User Role with this Name');
        else
            callback(null, rows);
    });
}

exports.insertItemDataType = function(name, description) {
    var query = 'INSERT INTO lookup_data_type (name';
    if(description != null)
        query +=', description';

    query += ') VALUES (';

    if(name != null)
        query += name;
    else
        throw Exceptions.dbException('insertItemDataType', 'Error: name = null');

    if(description != null)
        query +=', ' + description;

    query += ');'

    DB.query(query, function(err,rows,fields){
        if(err != null) {
            throw Exceptions.dbException('insertItemDataType', 'While Inserting new Item Data Type: ' + err);
            return false;
        } else {
            console.log('Successfully Inserted new Item Data Type');
            return true;
        }
    });
}
exports.insertItemType = function(name, description) {
    var query = 'INSERT INTO lookup_item_type (name';
    if(description != null)
        query +=', description';

    query += ') VALUES (';

    if(name != null)
        query += name;
    else
        throw Exceptions.dbException('insertItemType', 'Error: name = null');

    if(description != null)
        query +=', ' + description;

    query += ');'

    DB.query(query, function(err,rows,fields){
        if(err != null) {
            throw Exceptions.dbException('insertItemType', 'While Inserting new Item Type: ' + err);
            return false;
        } else {
            console.log('Successfully Inserted new Item Type');
            return true;
        }
    });
}
exports.insertUserRole = function(name, description) {
    var query = 'INSERT INTO lookup_user_role (name';
    if(description != null)
        query +=', description';

    query += ') VALUES (';

    if(name != null)
        query += name;
    else
        throw Exceptions.dbException('insertUserRole', 'Error: name = null');

    if(description != null)
        query +=', ' + description;

    query += ');'

    DB.query(query, function(err,rows,fields){
        if(err != null) {
            throw Exceptions.dbException('insertUserRole', 'While Inserting new UserRole: ' + err);
            return false;
        } else {
            console.log('Successfully Inserted new User Role');
            return true;
        }
    });
}
