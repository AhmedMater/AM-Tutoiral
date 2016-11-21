/**
 * Created by Ahmed Mater on 11/20/2016.
 */

var config = require('../../configuration');
var database = require(config.Repository._DBConnection).connection;
var Exceptions = require(config.Common.Exceptions);
var Logger = require(config.Common.Logger);

var fn_names = {
    getAllCourses: "getAllCourses",
    getCourseByID: "getCourseByID",
    getCourseByName: "getCourseByName"
};

var exports = module.exports = {
    getAllCourses: function(){
        var query =
            "SELECT " +
                "id " +
            "FROM " +
                "users " +
            "WHERE " +
                "user_name = \'" + userName + "\' OR email = \'" + email + "\';";

        database.query(query, function (err, rows, fields) {
            if (err != null) {
                Logger.error(config.FOLDERS_NAMES.repository, fn_names.isUserFound, err.message);
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


    },

    getCourseByID: function(){

    },

    getCourseByName: function () {

    }
};