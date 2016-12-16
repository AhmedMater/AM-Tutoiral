/**
 * Created by Ahmed Mater on 10/7/2016.
 */

module.exports = {

    MANDATORY_NULL_FIELD: function(fieldName){return "Error: Mandatory Field " + fieldName + " = null";},
    EMPTY_FIELD: function(fieldName){return "Error: " + fieldName + " has no value";},
    INVALID_FIELD: function(fieldName, msg){return "Error: Invalid input - " + fieldName + (msg ? " - " + msg : "");},
    LONG_LENGTH_FIELD: function(fieldName, msg){ return "Error: " + fieldName + " is too long" + (msg ? " - " + msg : "");},
    SHORT_LENGTH_FIELD: function(fieldName, msg){return "Error: " + fieldName + " is too short" + (msg ? " - " + msg : "");},
    VALUE_ALREADY_EXIST: function(fieldName){return "Error: " + fieldName + " already exists ";},
    DATE_IN_FUTURE: function(fieldName){return "Error: " + fieldName + " can't be in future ";},
    PASSWORD_NOT_MATCH: function(password1, password2){return "Error: " + password1 + " doesn't match " + password2;},
    //PASSWORD_EQ_USERNAME: "Error: Password can't be equal to Username",
    NULL_FIELD: function(fieldName){return "Error: " + fieldName + " = null";},

    INFO_0: "Logger File Opened Successfully",
    info_1_Found: function(value){ return "Info 1: " + value + " is Successfully retrieved From Database";},
    info_2_NotFound: function(value){ return "Info 2: " + value + " isn't found in the Database";},
    info_3_SuccessfullyInserted: function(value){ return "Info 3: " + value + " is successfully inserted in the Database";},
    info_4_AllFound: function(value){ return "Info 4: All " + value + " are Successfully retrieved From Database";},
    info_5_AllNotFound: function(value){ return "Info 5: No " + value + " found in the Database";},

    ERROR_MSG_DAY_1 : "It should be positive number in range of 01 to 31",

    ERROR_MSG_MONTH_1 : "It should be positive number in range of 01 to 12",
    ERROR_MSG_MONTH_2 : "February has at most 29 days",
    ERROR_MSG_MONTH_3 : "April, June, September and November have at most 30 days",

    ERROR_MSG_YEAR_1 : "It should be min 1900",

    ERROR_MSG_TITLE_1 : "It should be mix of upper and lower case letters, numbers, space, (-) and (/) only",
    ERROR_MSG_TITLE_2 : "It should be at most 70 Char",
    ERROR_MSG_TITLE_3 : "It should be at least 5 Char",

    ERROR_MSG_NUM_1 : "It should be number",
    ERROR_MSG_NUM_2 : "It should be positive number",

    ERROR_MSG_DESCRIPTION_1 : "It should be mix of upper and lower case letters, numbers, space and any of these symbols ().-\\/_!@#$%^&*<>{}[]()=+",
    ERROR_MSG_DESCRIPTION_2 : "It should be at most 500 Char",
    ERROR_MSG_DESCRIPTION_3 : "It should be at most 20 Char",

    ERROR_MSG_USERNAME_1 : "It should be mix of upper and lower case letters, numbers, (-), (.) and (_) only and can't start with number",
    ERROR_MSG_USERNAME_2 : "It should be at most 25 Char",
    ERROR_MSG_USERNAME_3 : "It should be at least 5 Char",

    ERROR_MSG_PASSWORD_1 : "It should be mix of upper and lower case letters, numbers and any of these symbols @%+\\/!#$&^?:.(){}[]~-_ only",
    ERROR_MSG_PASSWORD_2 : "It should be at most 20 Char",
    ERROR_MSG_PASSWORD_3 : "It should be at least 5 Char",

    ERROR_MSG_NAME_1 : "It should be mix of upper and lower case letters and space only",
    ERROR_MSG_NAME_2 : "It should be at most 15 Char",

    ERROR_MSG_GENDER : "It should be M (for Male) or F (for Female) only",
    createError: function(name, message){
        var err = new Error(message);
        err.status = 400;
        err.name = name;
        return err;
    }

};
