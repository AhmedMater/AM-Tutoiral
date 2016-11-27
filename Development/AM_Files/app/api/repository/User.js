/**
 * Created by Ahmed Mater on 10/6/2016.
 */

var config = require('../../configuration');
var database = require(config.Repository._DBConnection).connection;
var Exceptions = require(config.Common.ErrorMessages);
var Logger = require(config.Common.Logger);

var fn_names = {
    getUser: "getUser",
    insertUser: "insertUser",
    isUserFound: "isUserFound"
};

var exports = module.exports = {

    insertUser: function(userData, RepositoryCallBack) {

        database.query('INSERT INTO users SET ?', {
            user_name: userData.userName,
            password: userData.password,
            email: userData.email,
            user_role: userData.userRole,
            first_name: userData.firstName,
            last_name: userData.lastName,
            gender: userData.gender,
            mail_subscribe: userData.mailSubscribe,
            university: userData.university,
            college: userData.college,
            job: userData.job,
            country: userData.country,
            date_of_birth: userData.dateOfBirth.year + '-' + userData.dateOfBirth.month + '-' + userData.dateOfBirth.day
        }, function (err, rows, fields) {
            if (err != null)
                Logger.error(config.FOLDERS_NAMES.repository, "insertUser", err.message);

            RepositoryCallBack(err, null);
        });
    },

    getUser: function(userName, password, callback) {
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

                callback(err, result);
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
            var isFound = null;
            if (err != null) {
                Logger.error(config.FOLDERS_NAMES.repository, fn_names.isUserFound, err.message);
            } else {

                if (rows[0] != null) {
                    Logger.info(fn_names.isUserFound, 'User is found in Database');
                    isFound = true;
                } else {
                    Logger.info(fn_names.isUserFound, 'User isn\'t found in Database');
                    isFound = false;
                }
            }
            callback(err, isFound);
        });
    }
};
