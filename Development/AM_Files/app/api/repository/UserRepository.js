/**
 * Created by Ahmed Mater on 10/6/2016.
 */

var DB = rootRequire('AM-Database');

var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');

var USER = "User";
var USERS = "Users";
var DB_ERROR = SystemParam.DATABASE_ERROR;
var REPOSITORY = USER + SystemParam.REPOSITORY;

var exports = module.exports = {};

/**
 * It's a Repository function responsible for inserting new User record in the Database
 * @param userData User Data extracted from the Sign Up form
 * @param RepositoryCallback
 * @return int UserID of the record in Database
 * @throws Error - if there is error in the Query
 * @throws Error
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
        // in case of an Error
        if (err != null) {
            Logger.error(REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), -1);
        }

        // in case of inserting one record
        else if(rows.affectedRows == 1){
            Logger.debug(REPOSITORY, fnName, ErrMsg.IS_INSERTED(USER));
            return RepositoryCallback(err, rows.insertId);
        }

        // in case of inserting more than one record
        else{
            Logger.error(REPOSITORY, fnName, ErrMsg.NOT_INSERTED(USER));
            return RepositoryCallback(ErrMsg.createError(DB_ERROR, ErrMsg.NOT_INSERTED(USER)), null);
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
        var User = null;

        // in case of an error
        if (err != null) {
            Logger.error(REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), User);
        }

        // in case of selecting only one row
        else if(rows.length == 1){
            User = {
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

            Logger.debug(REPOSITORY, fnName, ErrMsg.IS_SELECTED(USER));
            return RepositoryCallback(err, User);
        }

        // case of no records is selected
        else if(rows.length == 0) {
            Logger.debug(REPOSITORY, fnName, ErrMsg.NOT_FOUND(USER));
            return RepositoryCallback(err, User);
        }

        // case of more than one record is selected
        else if(rows.length > 1) {
            Logger.error(REPOSITORY, fnName, ErrMsg.MANY_SELECTED(USER));
            return RepositoryCallback(ErrMsg.createError(DB_ERROR, ErrMsg.MANY_SELECTED(USER)), User);
        }
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
        var User = null;

        // in case of an error
        if (err != null) {
            Logger.error(REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), User);
        }

        // in case of selecting only one row
        else if(rows.length == 1){
            User = {
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

            Logger.debug(REPOSITORY, fnName, ErrMsg.IS_SELECTED(USER));
            return RepositoryCallback(err, User);
        }

        // case of no records is selected
        else if(rows.length == 0) {
            Logger.debug(REPOSITORY, fnName, ErrMsg.NOT_FOUND(USER));
            return RepositoryCallback(err, User);
        }

        // case of more than one record is selected
        else if(rows.length > 1) {
            Logger.error(REPOSITORY, fnName, ErrMsg.MANY_SELECTED(USER));
            return RepositoryCallback(ErrMsg.createError(DB_ERROR, ErrMsg.MANY_SELECTED(USER)), User);
        }
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
        var users = [];

        if (err != null) {
            Logger.error(REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
        }else if(rows.length == 0){
            Logger.debug(REPOSITORY, fnName, ErrMsg.ALL_NOT_SELECTED(USERS));
            return RepositoryCallback(err, users);
        } else {
            for (var i = 0; i < rows.length; i++)
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

            Logger.debug(REPOSITORY, fnName, ErrMsg.ALL_SELECTED(USERS));
            return RepositoryCallback(err, users);
        }
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

    var query = "DELETE FROM users WHERE id = " + DB.escape(userID);

    DB.beginTransaction(function(transactionError) {
        // in case of Transaction Error
        if (transactionError) {
            Logger.error(REPOSITORY, fnName, transactionError.message);
            return RepositoryCallback(ErrMsg.createError(DB_ERROR, transactionError.message), false);
        }

        DB.query(query, function (queryError, rows, fields) {

            // in case of Query Error
            if (queryError != null) {
                Logger.error(REPOSITORY, fnName, queryError.message);
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, queryError.message), false);
            }

            // in case of only one record to be deleted
            else if (rows.affectedRows == 1) {
                DB.commit(function (commitError) {
                    if (commitError) {
                        return DB.rollback(function () {
                            Logger.error(REPOSITORY, fnName, commitError.message);
                            Logger.debug(REPOSITORY, fnName, ErrMsg.TRANS_ROLLBACK);
                            return RepositoryCallback(ErrMsg.createError(DB_ERROR, commitError.message), false);
                        });
                    }
                    Logger.debug(REPOSITORY, fnName, ErrMsg.IS_DELETED(USER));
                    return RepositoryCallback(commitError, true);
                });
            }

            // in case of no records to be deleted
            else if (rows.affectedRows == 0) {
                Logger.debug(REPOSITORY, fnName, ErrMsg.DELETE_NOT_FOUND(USER));
                return RepositoryCallback(queryError, false);
            }

            // in case of more than one record will be deleted
            else if (rows.affectedRows > 1) {
                return DB.rollback(function () {
                    Logger.error(REPOSITORY, fnName, ErrMsg.MANY_DELETED(USER));
                    Logger.debug(REPOSITORY, fnName, ErrMsg.TRANS_ROLLBACK);
                    return RepositoryCallback(ErrMsg.createError(DB_ERROR, ErrMsg.MANY_DELETED(USER)), false);
                });
            }
        });
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
exports.updateUserByID = function(userID, newUserData, RepositoryCallback){
    var fnName = "updateUserByID";

    var conditions = {};

    if(newUserData.email) conditions['email'] = newUserData.email;
    if(newUserData.userRoleID) conditions['user_role_id'] = newUserData.userRoleID;
    if(newUserData.firstName) conditions['first_name'] = newUserData.firstName;
    if(newUserData.lastName) conditions['last_name'] = newUserData.lastName;
    if(newUserData.gender) conditions['gender'] = newUserData.gender;
    if(newUserData.mailSubscribe) conditions['mail_subscribe'] = newUserData.mailSubscribe;
    if(newUserData.university) conditions['university'] = newUserData.university;
    if(newUserData.college) conditions['college'] = newUserData.college;
    if(newUserData.job) conditions['job'] = newUserData.job;
    if(newUserData.country) conditions['country'] = newUserData.country;
    if(newUserData.dateOfBirth) conditions['date_of_birth'] = newUserData.dateOfBirth.year + '-' + newUserData.dateOfBirth.month + '-' + newUserData.dateOfBirth.day;
    if(newUserData.profilePic) conditions['profile_pic'] = newUserData.profilePic;
    if(newUserData.mobileNumber) conditions['mobile_number'] = newUserData.mobileNumber;

    conditions['last_updated'] = new Date();

    var query = "UPDATE users SET ? WHERE id = " + DB.escape(userID);

    DB.beginTransaction(function(transactionError) {
        // in case of Transaction Error
        if (transactionError) {
            Logger.error(REPOSITORY, fnName, transactionError.message);
            return RepositoryCallback(ErrMsg.createError(DB_ERROR, transactionError.message), false);
        }

        DB.query(query, conditions, function (queryError, rows, fields) {

            // in case of Query Error
            if (queryError != null) {
                Logger.error(REPOSITORY, fnName, queryError.message);
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, queryError.message), false);
            }

            // in case of only one record to be updated
            else if (rows.affectedRows == 1) {
                DB.commit(function (commitError) {
                    if (commitError) {
                        return DB.rollback(function () {
                            Logger.error(REPOSITORY, fnName, commitError.message);
                            Logger.debug(REPOSITORY, fnName, ErrMsg.TRANS_ROLLBACK);
                            return RepositoryCallback(ErrMsg.createError(DB_ERROR, commitError.message), false);
                        });
                    }
                    Logger.debug(REPOSITORY, fnName, ErrMsg.IS_UPDATED(USER));
                    return RepositoryCallback(commitError, true);
                });
            }

            // in case of no records to be updated
            else if (rows.affectedRows == 0) {
                Logger.debug(REPOSITORY, fnName, ErrMsg.UPDATE_NOT_FOUND(USER));
                return RepositoryCallback(queryError, false);
            }

            // in case of more than one record will be updated
            else if (rows.affectedRows > 1) {
                return DB.rollback(function () {
                    Logger.error(REPOSITORY, fnName, ErrMsg.MANY_UPDATED(USER));
                    Logger.debug(REPOSITORY, fnName, ErrMsg.TRANS_ROLLBACK);
                    return RepositoryCallback(ErrMsg.createError(DB_ERROR, ErrMsg.MANY_UPDATED(USER)), false);
                });
            }
        });
    });
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
        "SELECT 1 FROM users " +
        "WHERE " +
            "user_name = " + DB.escape(userName) + " OR " +
            "email = " + DB.escape(email) + ";";

    DB.query(query, function (err, rows, fields) {

        if (err != null) {
            Logger.error(REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
        }else if(rows.length == 0) {
            Logger.debug(REPOSITORY, fnName, ErrMsg.NOT_FOUND(USER));
            return RepositoryCallback(err, false);
        }else{
            Logger.debug(REPOSITORY, fnName, ErrMsg.IS_FOUND(USER));
            return RepositoryCallback(err, true);
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

    var query = "SELECT active FROM users WHERE id = " + DB.escape(userID);

    DB.query(query, function (err, rows, fields) {

        if (err != null) {
            Logger.error(REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
        }else if(rows.length == 1) {
            Logger.debug(REPOSITORY, fnName, ErrMsg.IS_SELECTED(USER));
            return RepositoryCallback(err, (rows[0].active == 1));
        }else if(rows.length > 1){
            Logger.error(REPOSITORY, fnName, ErrMsg.MANY_FOUND(USER));
            return RepositoryCallback(ErrMsg.createError(DB_ERROR, ErrMsg.MANY_FOUND(USER)), null);
        }else if(rows.length == 0) {
            Logger.error(REPOSITORY, fnName, ErrMsg.NOT_FOUND(USER));
            return RepositoryCallback(ErrMsg.createError(DB_ERROR, ErrMsg.NOT_FOUND(USER)), null);
        }
    });
};

/**
 * It's a Repository function responsible for changing the User Password in the Database
 * @param userID
 * @param userName
 * @param oldPassword
 * @param newPassword
 * @param RepositoryCallback
 * @return Boolean - true if Update succeeded <br/>
 *                   false if Update failed
 */
exports.changePassword = function(userID, userName, oldPassword, newPassword, RepositoryCallback) {
    var fnName = "changePassword";

    var query =
        "UPDATE user SET " +
        "newPassword = " + DB.escape(newPassword) +
        "WHERE " +
        "id = " + DB.escape(userID) + " AND " +
        "userName = " + DB.escape(userName) + " AND " +
        "oldPassword = " + DB.escape(oldPassword);

    DB.beginTransaction(function (transactionError) {
        // in case of Transaction Error
        if (transactionError) {
            Logger.error(REPOSITORY, fnName, transactionError.message);
            return RepositoryCallback(ErrMsg.createError(DB_ERROR, transactionError.message), false);
        }

        DB.query(query, function (queryError, rows, fields) {

            // in case of Query Error
            if (queryError != null) {
                Logger.error(REPOSITORY, fnName, queryError.message);
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, queryError.message), false);
            }

            // in case of only one record to be updated
            else if (rows.affectedRows == 1) {
                DB.commit(function (commitError) {
                    if (commitError) {
                        return DB.rollback(function () {
                            Logger.error(REPOSITORY, fnName, commitError.message);
                            Logger.debug(REPOSITORY, fnName, ErrMsg.TRANS_ROLLBACK);
                            return RepositoryCallback(ErrMsg.createError(DB_ERROR, commitError.message), false);
                        });
                    }
                    Logger.debug(REPOSITORY, fnName, ErrMsg.IS_UPDATED(USER));
                    return RepositoryCallback(commitError, true);
                });
            }

            // in case of no records to be updated
            else if (rows.affectedRows == 0) {
                Logger.debug(REPOSITORY, fnName, ErrMsg.UPDATE_NOT_FOUND(USER));
                return RepositoryCallback(queryError, false);
            }

            // in case of more than one record will be updated
            else if (rows.affectedRows > 1) {
                return DB.rollback(function () {
                    Logger.error(REPOSITORY, fnName, ErrMsg.MANY_UPDATED(USER));
                    Logger.debug(REPOSITORY, fnName, ErrMsg.TRANS_ROLLBACK);
                    return RepositoryCallback(ErrMsg.createError(DB_ERROR, ErrMsg.MANY_UPDATED(USER)), false);
                });
            }
        });
    });
};


