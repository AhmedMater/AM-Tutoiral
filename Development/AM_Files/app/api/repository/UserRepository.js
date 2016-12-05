/**
 * Created by Ahmed Mater on 10/6/2016.
 */

var DB = rootRequire('AM-Database');

var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');

module.exports = {

    insertUser: function(userData, RepositoryCallBack) {

        DB.query('INSERT INTO users SET ?', {
            user_name: userData.userName,
            password: userData.password,
            email: userData.email,
            user_role_id: userData.userRoleID,
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
                Logger.error(SystemParam.REPOSITORY, "insertUser", err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), false);
            }

            RepositoryCallBack(null, true);
        });
    },

    getUser: function(userName, password, RepositoryCallBack) {
        var fnName = "getUser";
        var query =
            "SELECT " +
                "user.id userID, user_name, first_name, last_name, email, profile_pic, date_of_registration, gender, " +
                "mail_subscribe, university, college, job, country, date_of_birth, mobile_number, " +
                "role.id AS roleID, role.name AS roleName, role.value AS roleValue " +
            "FROM " +
                "users user LEFT JOIN lookup_user_role role ON user.user_role_id = role.id " +
            "WHERE " +
                "user_name = " + DB.escape(userName) + " AND " +
                "password = " + DB.escape(password) + ";";

        DB.query(query, function (err, rows, fields) {
            if (err != null) {
                Logger.error(SystemParam.REPOSITORY, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), null);
            }

            var user = null;
            if (rows[0] != null) {
                user = {
                    userID: rows[0].userID,
                    userName: rows[0].user_name,
                    email: rows[0].email,
                    userRole: {
                        id: rows[0].roleID,
                        name: rows[0].roleName,
                        value: rows[0].roleValue
                    },
                    dateOfRegistration: rows[0].date_of_registration,
                    firstName: rows[0].first_name,
                    lastName: rows[0].last_name,
                    gender: (rows[0].gender == 'M') ? 'Male' : 'Female',
                    mailSubscribe: rows[0].mail_subscribe,
                    university: rows[0].university,
                    college: rows[0].college,
                    job: rows[0].job,
                    country: rows[0].country,
                    dateOfBirth: rows[0].date_of_birth,
                    mobileNumber: rows[0].mobile_number,
                    userPic: rows[0].profile_pic
                };
                Logger.info(fnName, ErrMsg.INFO_3);
            } else
                Logger.debug(SystemParam.REPOSITORY, fnName, ErrMsg.INFO_4);

            RepositoryCallBack(err, user);
        });
    },

    isUserFound: function(userName, email, RepositoryCallBack){
        var fnName = "isUserFound";

        var query =
            "SELECT " +
                "id FROM users " +
            "WHERE " +
                "user_name = " + DB.escape(userName) + " OR " +
                "email = " + DB.escape(email) + ";";

        DB.query(query, function (err, rows, fields) {
            var isFound = null;
            if (err != null) {
                Logger.error(SystemParam.REPOSITORY, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), null);
            }

            if (rows[0] != null) {
                Logger.info(fnName, ErrMsg.INFO_7);
                isFound = true;
            } else {
                Logger.info(fnName, ErrMsg.INFO_8);
                isFound = false;
            }

            RepositoryCallBack(err, isFound);
        });
    },

    getUserByID: function(userID, RepositoryCallBack) {
        var fnName = "getUserByID";
        var query =
            "SELECT " +
                "user.id userID, user_name, first_name, last_name, email, profile_pic, date_of_registration, gender, " +
                "mail_subscribe, university, college, job, country, date_of_birth, mobile_number, " +
                "role.id AS roleID, role.name AS roleName, role.value AS roleValue " +
            "FROM " +
                "users user LEFT JOIN lookup_user_role role ON user.user_role_id = role.id " +
            "WHERE " +
                "user.id = " + DB.escape(userID) + ";";

        DB.query(query, function (err, rows, fields) {
            if (err != null) {
                Logger.error(SystemParam.REPOSITORY, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), null);
            }

            var user = null;
            if (rows[0] != null) {
                user = {
                    userID: rows[0].userID,
                    userName: rows[0].user_name,
                    email: rows[0].email,
                    userRole: {
                        id: rows[0].roleID,
                        name: rows[0].roleName,
                        value: rows[0].roleValue
                    },
                    dateOfRegistration: rows[0].date_of_registration,
                    firstName: rows[0].first_name,
                    lastName: rows[0].last_name,
                    gender: (rows[0].gender == 'M') ? 'Male' : 'Female',
                    mailSubscribe: rows[0].mail_subscribe,
                    university: rows[0].university,
                    college: rows[0].college,
                    job: rows[0].job,
                    country: rows[0].country,
                    dateOfBirth: rows[0].date_of_birth,
                    mobileNumber: rows[0].mobile_number,
                    userPic: rows[0].profile_pic
                };
                Logger.info(fnName, ErrMsg.INFO_3);
            } else
                Logger.debug(SystemParam.REPOSITORY, fnName, ErrMsg.INFO_4);

            RepositoryCallBack(err, user);
        });
    },
};
