/**
 * Created by Ahmed Mater on 10/6/2016.
 */

var config = require('../../configuration');
var database = require(config.Repository._DBConnection).connection;
var Exceptions = require(config.Common.Exceptions);
var Logger = require(config.Common.Logger);

var fn_names = {
    getUser: "getUser",
    insertUser: "insertUser",
    isUserFound: "isUserFound"
};

var exports = module.exports = {

    insertUser: function(userData, callback) {

//exports.insertUser = function(userName, password, email, userRoleID, firstName, lastName, gender,
//                              university, college, job, country, dateOfBirth, mailSubscribe, callback) {
        var query = 'INSERT INTO users SET ?';

        database.query(query, userData, function (err, rows, fields) {
            if (err != null)
                Logger.error(config.FOLDERS_NAMES.repository,fn_names.insertUser,err.message);

            callback(err, true);
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
    },

    getUser: function(userName, password, callback) {
        if (userName == null || password == null)
            Logger.error(config.FOLDERS_NAMES.repository,fn_names.getUser,"Username or Password is null");

        var query =
            "SELECT " +
                "user.id userID, user_name, first_name, last_name, role.id AS roleID, role.name AS roleName, email," +
                "profile_pic " +
            "FROM " +
                "users user LEFT JOIN lookup_user_role role ON user.user_role = role.id " +
            "WHERE " +
                "user_name = \'" + userName + "\' " +
                "AND password = \'" + password + "\';";

        database.query(query, function (err, rows, fields) {
            if (err != null) {
                Logger.error(config.FOLDERS_NAMES.repository, fn_names.getUser, err.message);
            } else {
                var result;
                if (rows[0] != null) {
                    result = {
                        userID: rows[0].userID,
                        userName: rows[0].user_name,
                        firstName: rows[0].first_name,
                        lastName: rows[0].last_name,
                        userRole: {
                            roleID: rows[0].roleID,
                            roleName: rows[0].roleName
                        },
                        email: rows[0].email,
                        userPic: rows[0].profile_pic
                    };
                    Logger.info(fn_names.getUser, 'User data is retrieved');
                } else {
                    result = null;
                    Logger.debug(config.FOLDERS_NAMES.repository, fn_names.getUser, 'No such User found in Database');
                }

                callback(null, result);
            }
        });

    },

    isUserFound: function(userName, email, callback){
        var query =
            "SELECT " +
                "id FROM users " +
            "WHERE " +
                "user_name = \'" + userName + "\' OR email = \'" + email + "\';";

        database.query(query, function (err, rows, fields) {
            if (err != null) {
                Logger.error(config.FOLDERS_NAMES.repository, fn_names.isUserFound, err.message);
                callback(err, null);
            } else {

                if (rows[0] != null) {
                    Logger.info(fn_names.isUserFound, 'User is found in Database');
                    callback(null, true);
                } else {
                    Logger.info(fn_names.isUserFound, 'User isn\'t found in Database');
                    callback(null, false);
                }
            }
        });
    }
};
