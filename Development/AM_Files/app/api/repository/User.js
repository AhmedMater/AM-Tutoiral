/**
 * Created by Ahmed Mater on 10/6/2016.
 */

var config = configRequire();
var database = DBConnectionRequire();

var ErrMsg = commonJSRequire('ErrorMessages');
var SystemParameters = commonJSRequire('SystemParameters');
var Logger = commonJSRequire('Logger');

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
            if (err != null) {
                Logger.error(config.FOLDERS_NAMES.repository, "insertUser", err.message);
                return RepositoryCallBack(ErrMsg.createError(ErrMsg.DATABASE_ERROR, 400, err.message), false);
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
                "user_name = \'" + userName + "\' " +
                "AND password = \'" + password + "\';";

        database.query(query, function (err, rows, fields) {
            if (err != null) {
                Logger.error(config.FOLDERS_NAMES.repository, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(ErrMsg.DATABASE_ERROR, 400, err.message), null);
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
                Logger.debug(config.FOLDERS_NAMES.repository, fnName, ErrMsg.INFO_4);

            RepositoryCallBack(err, user);
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
