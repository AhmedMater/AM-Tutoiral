/**
 * Created by Ahmed Mater on 10/2/2016.
 */

var config = require('../../configuration');
var database = require(config.Repository._DBConnection).connection;
var ErrMsg = require(config.Common.ErrorMessages);
var SystemParameters = require(config.Common.SystemParameters);
var Logger = require(config.Common.Logger);

var exports = module.exports = {

    getAllLookupTypes: function(){
        var query =
            "SELECT " +
                "lt.name lookupType, l.name lookupName, l.value lookupValue " +
            "FROM " +
                "lookup l " +
                    "LEFT JOIN lookup_type lt ON l.type_id = lt.id";

        database.query(query, function (err, rows, fields) {
            if (err != null)
                Logger.error(config.FOLDERS_NAMES.repository, "getAllLookupTypes", err.message);

            callback(err, rows);
        });
    },

    getAllUserRules: function(callback) {
        var query = 'SELECT * FROM lookup LEFT JOIN lookup_type;';
        database.query(query, function (err, rows, fields) {
            if (err != null)
                Logger.error(config.FOLDERS_NAMES.repository, "getAllUserRules", err.message);

            callback(err, rows);
        });
    },

    getUserRole_ByName: function(name, RepositoryCallBack) {
        var query =
            "SELECT " +
                "l.id lookupID, lt.name lookupType, l.name lookupName, l.value lookupValue " +
            "FROM " +
                "lookup l " +
                    "LEFT JOIN lookup_type lt ON l.type_id = lt.id " +
            "WHERE " +
                "l.name = \'" + name +"\' AND l.type_id = " + SystemParameters.UserRole.typeID + ";";

        database.query(query, function(err,rows,fields){
            if(err != null) {
                Logger.error(config.FOLDERS_NAMES.repository, "getUserRole_byName", err.message);
                return RepositoryCallBack(err, null);
            }

            var userRole = null;
            if (rows[0] != null) {
                userRole = {
                    id: rows[0].lookupID,
                    type: rows[0].lookupType,
                    name: rows[0].lookupName,
                    value: rows[0].lookupValue
                };

                Logger.info("getUserRole_byName", ErrMsg.INFO_1);
            } else
                Logger.info("getUserRole_byName", ErrMsg.INFO_2);


            RepositoryCallBack(err, userRole);
        });
    }
};

