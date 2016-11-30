/**
 * Created by Ahmed Mater on 11/20/2016.
 */

var config = rootRequire('configuration');
var DB = rootRequire('AM-Database');

var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');

module.exports = {
    insertCourse: function(userData, RepositoryCallBack) {

        DB.query('INSERT INTO users SET ?', {
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
            if (err != null) {
                Logger.error(config.FOLDERS_NAMES.repository, "insertCourse", err.message);
                return RepositoryCallBack(ErrMsg.createError(ErrMsg.DATABASE_ERROR, 400, err.message), false);
            }

            RepositoryCallBack(null, true);
        });
    },
    getAllCourses: function(RepositoryCallBack) {
        var fnName = "getAllCourses";

        var query =
            "SELECT " +
            "id, name, value " +
            "FROM " +
            "lookup_user_role ";

        DB.query(query, function (err, rows, fields) {
            if (err != null) {
                Logger.error(config.FOLDERS_NAMES.repository, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(ErrMsg.DATABASE_ERROR, 400, err.message), null);
            }

            var coursesInfo = [];
            if(rows != null){
                for(var i=0 ; i<rows.length; i++)
                    coursesInfo.push({
                        id: rows[i].id,
                        name: rows[i].name,
                        value: rows[i].value
                    });

                Logger.info(fnName, ErrMsg.INFO_5);
            } else
                Logger.info(fnName, ErrMsg.INFO_6);

            RepositoryCallBack(err, coursesInfo);
        });
    },
    getCourse_ByName: function(name, RepositoryCallBack) {
        var fnName = "getCourse_ByName";
        var query =
            "SELECT " +
            "id, name, value " +
            "FROM " +
            "lookup_user_role " +
            "WHERE " +
            "name = " + DB.escape(name) +" ;";

        DB.query(query, function(err,rows,fields){
            if(err != null) {
                Logger.error(config.FOLDERS_NAMES.repository, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(ErrMsg.DATABASE_ERROR, 400, err.message), null);
            }

            var courseInfo = null;
            if (rows != null) {
                courseInfo = {
                    id: rows[0].id,
                    name: rows[0].name,
                    value: rows[0].value
                };

                Logger.info(fnName, ErrMsg.INFO_1);
            } else
                Logger.info(fnName, ErrMsg.INFO_2);


            RepositoryCallBack(err, courseInfo);
        });
    },
    getCourse_ByID: function(id, RepositoryCallBack) {
        var fnName = "getCourse_ByID";
        var query =
            "SELECT " +
            "id, name, value " +
            "FROM " +
            "lookup_user_role " +
            "WHERE " +
            "id = " + DB.escape(id) +" ;";

        DB.query(query, function(err,rows,fields){
            if(err != null) {
                Logger.error(config.FOLDERS_NAMES.repository, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(ErrMsg.DATABASE_ERROR, 400, err.message), null);
            }

            var courseInfo = null;
            if (rows != null) {
                courseInfo = {
                    id: rows[0].id,
                    name: rows[0].name,
                    value: rows[0].value
                };

                Logger.info(fnName, ErrMsg.INFO_1);
            } else
                Logger.info(fnName, ErrMsg.INFO_2);


            RepositoryCallBack(err, courseInfo);
        });
    }
};