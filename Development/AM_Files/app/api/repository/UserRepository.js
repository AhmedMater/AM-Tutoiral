/**
 * Created by Ahmed Mater on 10/6/2016.
 */

var DB = rootRequire('AM-Database');

var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');

var exports = module.exports = {};

/**
 * It's a Repository function responsible for inserting new User record in the Database
 * @param userData User Data extracted from the Sign Up form
 * @param RepositoryCallback
 * @return Boolean  true - if succeeded <br/>
 *                  false - if failed
 */
exports.insertUser = function(userData, RepositoryCallback) {
    var fnName = "insertUser";

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
            Logger.error(SystemParam.REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), false);
        } else{
            Logger.debug(SystemParam.REPOSITORY, fnName, ErrMsg.info_3_SuccessfullyInserted("User"));
            return RepositoryCallback(null, true);
        }

    });
};

/**
 * It's a Repository function responsible for retrieving all the Data of the User from Database by its User ID
 * @param userName
 * @param password
 * @param RepositoryCallback
 * @return User Object - has the full data of the user from the Database
 */
exports.selectUserByLoginData = function(userName, password, RepositoryCallback) {
    var fnName = "selectUserByLoginData";

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
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), null);
        }else if(rows[0] == null){
            Logger.debug(SystemParam.REPOSITORY, ErrMsg.info_2_NotFound("User"));
            return RepositoryCallback(null, null);
        }

        var User = {
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

        Logger.debug(SystemParam.REPOSITORY, fnName, ErrMsg.info_1_Found("User"));
        return RepositoryCallback(null, user);
    });
};

/**
 * It's a Repository function responsible for retrieving all the Data of the User from the Database by its User ID
 * @param serID
 * @param RepositoryCallback
 * @return User Object has the full data of the user from the Database
 */
exports.selectUserByID = function(userID, RepositoryCallback) {
    var fnName = "selectUserByID";
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
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), null);
        }else if(rows[0] == null) {
            Logger.debug(SystemParam.REPOSITORY, fnName, ErrMsg.info_2_NotFound("User"));
            return RepositoryCallback(null, null);
        }

        var User = {
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

        Logger.debug(SystemParam.REPOSITORY, fnName, ErrMsg.info_1_Found("User"));
        return RepositoryCallback(err, user);
    });
};

/**
 * It's a Repository function responsible for retrieving all the User Data from the Database
 * @param RepositoryCallback
 * @return User[] Array of User Objects
 */
exports.selectAllUsers = function(RepositoryCallback){
    var fnName = "selectAllUsers";

    var query =
        "SELECT " +
            "user.id userID, user_name, first_name, last_name, email, profile_pic, date_of_registration, gender, " +
            "mail_subscribe, university, college, job, country, date_of_birth, mobile_number, " +
            "role.id AS roleID, role.name AS roleName, role.value AS roleValue " +
        "FROM " +
            "users user LEFT JOIN lookup_user_role role ON user.user_role_id = role.id;";

    DB.query(query, function (err, rows, fields) {
        if (err != null) {
            Logger.error(SystemParam.REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), null);
        }

        if(rows.length == 0){
            Logger.error(SystemParam.REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), null);
        }

        var users = [];
        for(var i=0; i<rows.length; i++)
            users.push({
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
            });


        return RepositoryCallback(err, users);
    });
};

/**
 * It's a Repository function responsible for deleting User record from the Database
 * @param userID
 * @param RepositoryCallback
 * return Boolean - true if Deleting Successfully Done <br/>
 *                  false if Deleting failed
 */
exports.deleteUserByID = function(userID, RepositoryCallback){
    var fnName = "deleteUserByID";

    var query = "DELETE FROM user WHERE id = " + DB.escape(userID);
    DB.query(query, function(err, rows, fields){
        if (err != null) {
            Logger.error(SystemParam.REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), false);
        }
        return RepositoryCallback(null, true);
    });
};

/**
 * It's a Repository function responsible for updating the User Data in the Database
 * @param userID
 * @param newUserDate
 * @param RepositoryCallback
 * return Boolean true if Update succeeded <br/>
 *                false if Update failed
 */
exports.updateUserByID = function(userID, newUserDate, RepositoryCallback){
    var fnName = "updateUserByID";
    var conditions = [];

    if(newUserDate.email != null)
        conditions.push("email = " + DB.escape(newUserDate.email));
    else if(newUserDate.userRoleID != null)
        conditions.push("user_role_id = " + DB.escape(newUserDate.userRoleID));
    else if(newUserDate.firstName != null)
        conditions.push("first_name = " + DB.escape(newUserDate.firstName));
    else if(newUserDate.lastName != null)
        conditions.push("last_name = " + DB.escape(newUserDate.lastName));
    else if(newUserDate.gender != null)
        conditions.push("gender = " + DB.escape(newUserDate.gender));
    else if(newUserDate.mailSubscribe != null)
        conditions.push("mail_subscribe = " + DB.escape(newUserDate.mailSubscribe));
    else if(newUserDate.university != null)
        conditions.push("university = " + DB.escape(newUserDate.university));
    else if(newUserDate.college != null)
        conditions.push("college = " + DB.escape(newUserDate.college));
    else if(newUserDate.job != null)
        conditions.push("job = " + DB.escape(newUserDate.job));
    else if(newUserDate.country != null)
        conditions.push("country = " + DB.escape(newUserDate.country));
    else if(newUserDate.dateOfBirth != null)
        conditions.push("date_of_birth = " + DB.escape(DB.createSQLDate(newUserDate.dateOfBirth)));
    else if(newUserDate.profilePic != null)
        conditions.push("profile_pic = " + DB.escape(newUserDate.profilePic));
    else if(newUserDate.mobileNumber != null)
        conditions.push("mobile_number = " + DB.escape(newUserDate.mobileNumber));
    else if(newUserDate.lastLoginDate != null)
        conditions.push("last_login_date = " + DB.escape(DB.createSQLDate(newUserDate.lastLoginDate)));

    conditions.push("last_updated = NOW()");
    conditions.push("active = 1");
    conditions.push("number_of_logins = 0");

    var query = "UPDATE user SET " + conditions + " WHERE id = " + DB.escape(userID);
};

/**
 * It's a Repository function responsible for testing if this User already found before in the Database
 * @param userName
 * @param email
 * @param RepositoryCallback
 * @return Boolean  true - if found <br/>
 *                  false - if not found
 */
exports.isUserFound = function(userName, email, RepositoryCallback){
    var fnName = "isUserFound";

    var query =
        "SELECT id FROM users " +
        "WHERE " +
            "user_name = " + DB.escape(userName) + " OR " +
            "email = " + DB.escape(email) + ";";

    DB.query(query, function (err, rows, fields) {
        if (err != null) {
            Logger.error(SystemParam.REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), null);
        }

        if (rows[0] != null) {
            Logger.debug(SystemParam.REPOSITORY, fnName, ErrMsg.info_1_Found("User"));
            return RepositoryCallback(err, true);
        } else {
            Logger.debug(SystemParam.REPOSITORY, fnName, ErrMsg.info_2_NotFound("User"));
            return RepositoryCallback(err, false);
        }
    });
};

/**
 * It's a Repository function responsible for testing if this User is active before in the Database
 * @param userID
 * @param RepositoryCallback
 * @return Boolean  true - if active <br/>
 *                  false - if not active
 */
exports.isUserActive = function(userID, RepositoryCallback){
    var fnName = "isUserActive";

    var query =
        "SELECT active FROM users WHERE id = " + DB.escape(userID);

    DB.query(query, function (err, rows, fields) {
        if (err != null) {
            Logger.error(SystemParam.REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), null);
        }

        if (rows[0] != null) {
            Logger.debug(SystemParam.REPOSITORY, fnName, ErrMsg.info_1_Found("User"));
            return RepositoryCallback(err, rows[0].active);
        } else {
            Logger.debug(SystemParam.REPOSITORY, fnName, ErrMsg.info_2_NotFound("User"));
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, ErrMsg.info_2_NotFound("User")), false);
        }
    });
};

/**
 * It's a Reository function responsible for changing the User Password in the Database
 * @param userID
 * @param userName
 * @param oldPassword
 * @param newPassword
 * @param RepositoryCallback
 * @return Boolean - true if Update succeeded <br/>
 *                   false if Update failed
 */
exports.changePassword = function(userID, userName, oldPassword, newPassword, RepositoryCallback){
    var fnName = "changePassword";

    var query =
        "UPDATE user SET " +
            "newPassword = " + DB.escape(newPassword) +
        "WHERE " +
            "id = " + DB.escape(userID) + " AND " +
            "userName = " + DB.escape(userName) + " AND " +
            "oldPassword = " + DB.escape(oldPassword);

    DB.query(query, function (err, rows, fields) {
        if (err != null) {
            Logger.error(SystemParam.REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), null);
        }

        if (rows[0] != null) {
            Logger.debug(SystemParam.REPOSITORY, fnName, ErrMsg.info_1_Found("User"));
            return RepositoryCallback(err, rows[0].active);
        } else {
            Logger.debug(SystemParam.REPOSITORY, fnName, ErrMsg.info_2_NotFound("User"));
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, ErrMsg.info_2_NotFound("User")), false);
        }
    });
};


