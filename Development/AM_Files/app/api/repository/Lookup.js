/**
 * Created by Ahmed Mater on 10/2/2016.
 */

var config = require('../../configuration');
var database = require(config.Repository._DBConnection).connection;
var ErrMsg = require(config.Common.ErrorMessages);
var SystemParameters = require(config.Common.SystemParameters);
var Logger = require(config.Common.Logger);

var exports = module.exports = {
    getAllUserRoles: function(RepositoryCallBack) {
        var fnName = "getAllUserRoles";
        var query =
            "SELECT " +
                "id, name, value " +
            "FROM " +
                "lookup_user_role ";

        database.query(query, function (err, rows, fields) {
            if (err != null) {
                Logger.error(config.FOLDERS_NAMES.repository, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(ErrMsg.DATABASE_ERROR, 400, err.message), null);
            }

            var userRoles = [];
            if(rows != null){
                for(var i=0 ; i<rows.length; i++)
                    userRoles.push({
                        id: rows[i].id,
                        name: rows[i].name,
                        value: rows[i].value
                    });

                Logger.info(fnName, ErrMsg.INFO_1);
            } else
                Logger.info(fnName, ErrMsg.INFO_2);

            RepositoryCallBack(err, userRoles);
        });
    },

    getUserRole_ByName: function(name, RepositoryCallBack) {
        var fnName = "getUserRole_byName";
        var query =
            "SELECT " +
                "id, name, value " +
            "FROM " +
                "lookup_user_role " +
            "WHERE " +
                "name = " + database.escape(name) +";";

        database.query(query, function(err,rows,fields){
            if(err != null) {
                Logger.error(config.FOLDERS_NAMES.repository, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(ErrMsg.DATABASE_ERROR, 400, err.message), null);
            }

            var userRole = null;
            if (rows != null) {
                userRole = {
                    id: rows[0].id,
                    name: rows[0].name,
                    value: rows[0].value
                };

                Logger.info(fnName, ErrMsg.INFO_1);
            } else
                Logger.info(fnName, ErrMsg.INFO_2);


            RepositoryCallBack(err, userRole);
        });
    },

    getUserRole_ByID: function(id, RepositoryCallBack) {
        var fnName = "getUserRole_byID";
        var query =
            "SELECT " +
                "id, name, value " +
            "FROM " +
                "lookup_user_role " +
            "WHERE " +
                "id = " + database.escape(id) +";";

        database.query(query, function(err,rows,fields){
            if(err != null) {
                Logger.error(config.FOLDERS_NAMES.repository, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(ErrMsg.DATABASE_ERROR, 400, err.message), null);
            }

            var userRole = null;
            if (rows != null) {
                userRole = {
                    id: rows[0].id,
                    name: rows[0].name,
                    value: rows[0].value
                };

                Logger.info(fnName, ErrMsg.INFO_1);
            } else
                Logger.info(fnName, ErrMsg.INFO_2);


            RepositoryCallBack(err, userRole);
        });
    }
};

