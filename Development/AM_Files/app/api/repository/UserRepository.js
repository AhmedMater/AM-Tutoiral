/**
 * Created by Ahmed Mater on 10/6/2016.
 */

var DB = rootRequire('AM-Database');
var async = require('async');

var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');
var Generic = rootRequire('GenericRepository');
var Models = rootRequire('Models');

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

    var query = 'INSERT INTO users SET ?';
    var recordData = {
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
        date_of_birth: Generic.createSQLDate(userData.dateOfBirth)
    };

    async.waterfall([
        function(GenericCallback){ Generic.insertRecord(query, recordData, REPOSITORY, fnName, USER, GenericCallback); }],
        function(err, userID) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, userID);
        }
    );
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

    async.waterfall([
            function(GenericCallback){ Generic.selectRecord(query, REPOSITORY, fnName, USER, GenericCallback); },
            function(data, ModelCallback){ Models.setUser(data, ModelCallback); }
        ], function(err, User) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, User);
        }
    );
};

/**
 * It's a Repository function responsible for retrieving all the Data of the User from the Database by its User ID
 * @param userID
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

    async.waterfall([
            function(GenericCallback){ Generic.selectRecord(query, REPOSITORY, fnName, USER, GenericCallback); },
            function(data, ModelCallback){ Models.setUser(data, ModelCallback); }
        ], function(err, User) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, User);
        }
    );
};

/**
 * It's a Repository function responsible for retrieving all the User Data according to filtering criteria from the Database
 * @param RepositoryCallback
 * @return User[] Array of User Objects
 */
exports.selectAllUsers = function(name, dateOfRegFrom, dateOfRegTo, roleID, gender, datOfBirthFrom, datOfBirthTo, isActive, RepositoryCallback){
    var fnName = "selectAllUsers";

    var query =
        "SELECT " +
            "user.id userID, CONCAT(first_name, ' ', last_name) as fullName, date_of_registration, gender, " +
            "university, college, job, country, date_of_birth, role.name AS roleName " +
        "FROM " +
            "users user LEFT JOIN lookup_user_role role ON user.user_role_id = role.id ";

    var conditions = [];

    conditions.push(Generic.setCondition("CONCAT(first_name, ' ', last_name)", name, "LIKE"));
    conditions.push(Generic.setCondition("user.user_role_id", roleID));
    conditions.push(Generic.setCondition("user.gender", gender));
    conditions.push(Generic.setCondition("user.active", isActive));
    conditions.push(Generic.setCondition("date_of_registration", null, null, "date", dateOfRegFrom, dateOfRegTo));
    conditions.push(Generic.setCondition("date_of_birth", null, null, "date", datOfBirthFrom, datOfBirthTo));

    async.waterfall([
            function(DBUtilityCallback){ Generic.constructWhereStatement(conditions, DBUtilityCallback);},
            function(whereStatement, GenericCallback){ Generic.selectAllRecords(query + ((whereStatement) ? whereStatement : ""), REPOSITORY, fnName, USER, GenericCallback); },
            function(data, ModelCallback){ Models.setAllUsers(data, ModelCallback); }
        ], function(err, Users) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, Users);
        }
    );
};

/**
 * It's a Repository function responsible for deleting User record from the Database
 * @param userID
 * @param RepositoryCallback
 * @return Boolean - true if Deleting Successfully Done <br/>
 *                  false if Deleting failed
 */
exports.deleteUserByID = function(userID, RepositoryCallback){
    var fnName = "deleteUserByID";

    var query = "DELETE FROM users WHERE id = " + DB.escape(userID);

    async.waterfall([
        function(GenericCallback){ Generic.deleteRecord(query, REPOSITORY, fnName, USER, GenericCallback); }],
        function(err, done) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, done);
        }
    );
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

    var attributes = {};

    if(newUserData.email) attributes['email'] = newUserData.email;
    if(newUserData.userRoleID) attributes['user_role_id'] = newUserData.userRoleID;
    if(newUserData.firstName) attributes['first_name'] = newUserData.firstName;
    if(newUserData.lastName) attributes['last_name'] = newUserData.lastName;
    if(newUserData.gender) attributes['gender'] = newUserData.gender;
    if(newUserData.mailSubscribe) attributes['mail_subscribe'] = newUserData.mailSubscribe;
    if(newUserData.university) attributes['university'] = newUserData.university;
    if(newUserData.college) attributes['college'] = newUserData.college;
    if(newUserData.job) attributes['job'] = newUserData.job;
    if(newUserData.country) attributes['country'] = newUserData.country;
    if(newUserData.dateOfBirth) attributes['date_of_birth'] = newUserData.dateOfBirth.year + '-' + newUserData.dateOfBirth.month + '-' + newUserData.dateOfBirth.day;
    if(newUserData.profilePic) attributes['profile_pic'] = newUserData.profilePic;
    if(newUserData.mobileNumber) attributes['mobile_number'] = newUserData.mobileNumber;

    attributes['last_updated'] = new Date();

    var query = "UPDATE users SET ? WHERE id = " + DB.escape(userID);

    async.waterfall([ function(GenericCallback){Generic.updateRecord(query, attributes, REPOSITORY, fnName, USER, GenericCallback); }],
        function(err, done) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, done);
        }
    );
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

    async.waterfall([function(GenericCallback){Generic.isRecordFound(query, REPOSITORY, fnName, USER, GenericCallback);}],
        function(err, isFound) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, isFound);
        }
    );
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

    async.waterfall([function(GenericCallback){Generic.selectValue(query, "active", REPOSITORY, fnName, USER, GenericCallback);}],
        function(err, isActive) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, (isActive == 1));
        }
    );
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

    var newData = { password: newPassword };

    var query =
        "UPDATE users SET ? WHERE " +
            "id = " + DB.escape(userID) + " AND " +
            "user_name = " + DB.escape(userName) + " AND " +
            "password = " + DB.escape(oldPassword);

    async.waterfall([function(GenericCallback){Generic.updateRecord(query, newData, REPOSITORY, fnName, USER, GenericCallback);}],
        function(err, done) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, done);
        }
    );
};