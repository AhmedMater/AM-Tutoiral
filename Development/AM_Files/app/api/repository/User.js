/**
 * Created by Ahmed Mater on 10/6/2016.
 */

var config = require('../../configuration');
var database = require(config.Repository._DBConnection);
var Exceptions = require(config.Common.Exceptions);
var Logger = require(config.Common.Logger);

var fn_names = {
    getUser: "getUser",
    insertUser: "insertUser",
    isUserFound: "isUserFound"
};

var exports = module.exports = {

    insertUser: function(userData, callback) {
        try {
            Logger.debug(config.FOLDERS_NAMES.repository, fn_names.insertUser, 'Started');

//exports.insertUser = function(userName, password, email, userRoleID, firstName, lastName, gender,
//                              university, college, job, country, dateOfBirth, mailSubscribe, callback) {
            var query = 'INSERT INTO users SET ?';

            database.connection.query(query, userData, function (err, rows, fields) {
                if (err != null)
                    throw new Exceptions.dbException(fn_names.insertUser, err.message);

                callback(null, true);
            });

            //var query = 'INSERT INTO users (user_name, password, email, user_role, first_name, last_name, mail_subscribe, gender ';
            //
            //if(university != null) query += ', university';
            //if(college != null) query += ', college';
            //if(job != null) query += ', job';
            //if(country != null) query += ', country';
            //if(dateOfBirth != null) query += ', date_of_birth';
            //
            //query += ') VALUES (\'' + userName + '\', \'' + password + '\', \'' + email + "\', " + userRoleID + ', \''
            //    + firstName + '\', \'' + lastName + '\', ' + mailSubscribe + ', \'' + gender;
            //
            //if(university != null) query += '\', \'' + university;
            //if(college != null) query += '\', \'' + college;
            //if(job != null) query += '\', \'' + job;
            //if(country != null) query += '\', \'' + country;
            //if(dateOfBirth != null) query += '\', \'' + dateOfBirth;
            //
            //query += '\');';
            //
            //DB.connection.query(query, function(err,rows,fields){
            //    if(err != null)
            //        throw Exceptions.dbException('insertUser', 'While Inserting new User: ' + err);
            //
            //    callback(null, true);
            //});
            Logger.debug(config.FOLDERS_NAMES.repository, fn_names.insertUser, 'Ended');
        } catch (e){
            Logger.error(config.FOLDERS_NAMES.repository,fn_names.insertUser,e);
            throw new Exceptions.dbException(fn_names.insertUser,e.message);
        }
    },

    getUser: function(userName, password, callback) {
        try {
            Logger.debug(config.FOLDERS_NAMES.repository, fn_names.getUser, 'Started');

            if (userName == null)
                throw new Exceptions.dbException(fn_names.getUser, 'User Name = null');
            else if (password == null)
                throw new Exceptions.dbException(fn_names.getUser, 'Password = null');

            var query =
                "SELECT "
                + "user.id userID, user_name, first_name, last_name, role.id AS roleID, role.name AS roleName, email " +
                "FROM "
                + "users user LEFT JOIN lookup_user_role role ON user.user_role = role.id " +
                "WHERE "
                + "user_name = \'" + userName + "\' AND password = \'" + password + "\';";

            database.connection.query(query, function (err, rows, fields) {
                if (err != null)
                    throw new Exceptions.dbException(fn_names.getUser, err.message);

                var result;
                if (rows[0] != null) {
                    result = {
                        userID: rows[0].userID,
                        userName: rows[0].user_name,
                        fullName: rows[0].first_name + ' ' + rows[0].last_name,
                        userRole: {
                            id: rows[0].roleID,
                            name: rows[0].roleName
                        },
                        email: rows[0].email
                    };
                    Logger.info(fn_names.getUser, 'User data is retrieved');
                } else {
                    result = null;
                    Logger.debug(config.FOLDERS_NAMES.repository, fn_names.getUser, 'No such User found in Database');
                }

                callback(null, result);
            });
            Logger.debug(config.FOLDERS_NAMES.repository, fn_names.getUser, 'Ended');
        } catch (e){
            Logger.error(config.FOLDERS_NAMES.repository,fn_names.getUser,e);
            throw new Exceptions.dbException(fn_names.getUser,e.message);
        }
    },

    isUserFound: function(userName, email, callback){
        try {
            Logger.debug(config.FOLDERS_NAMES.repository, fn_names.isUserFound, 'Started');

            var query =
                "SELECT id " +
                "FROM users " +
                "WHERE userName = \'" + userName + "\' OR email = \'" + email + "\';";

            database.connection.query(query, function (err, rows, fields) {
                if (err != null)
                    throw new Exceptions.dbException(fn_names.isUserFound, err.message);

                if (rows[0] != null) {
                    Logger.info(fn_names.isUserFound, 'User is found in Database');
                    callback(null, true);
                } else {
                    Logger.info(fn_names.isUserFound, 'User isn\'t found in Database');
                    callback(null, false);
                }
            });
            Logger.debug(config.FOLDERS_NAMES.repository, fn_names.isUserFound, 'Ended');
        } catch (e){
            Logger.error(config.FOLDERS_NAMES.repository,fn_names.isUserFound,e);
            throw new Exceptions.dbException(fn_names.isUserFound,e.message);
        }
    }


};
