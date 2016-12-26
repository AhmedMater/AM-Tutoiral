/**
 * Created by Ahmed Mater on 10/7/2016.
 */

module.exports = {

    MANDATORY_NULL_FIELD: function(fieldName){return "Mandatory Field " + "(" + fieldName + ") = null";},
    EMPTY_FIELD: function(fieldName){return "(" + fieldName + ") has no value";},
    INVALID_FIELD: function(fieldName, msg){return "Invalid input - (" + fieldName + (msg ? ") - " + msg : ")");},
    LONG_LENGTH_FIELD: function(fieldName, msg){ return "(" + fieldName + ") is too long" + (msg ? " - " + msg : "");},
    SHORT_LENGTH_FIELD: function(fieldName, msg){return "(" + fieldName + ") is too short" + (msg ? " - " + msg : "");},
    VALUE_ALREADY_EXIST: function(fieldName){return "(" + fieldName + ") already exists ";},
    DATE_IN_FUTURE: function(fieldName){return "(" + fieldName + ") can't be in future ";},
    PASSWORD_NOT_MATCH: function(password1, password2){return "(" + password1 + ") doesn't match (" + password2 + ")";},
    //PASSWORD_EQ_USERNAME: "Error: Password can't be equal to Username",
    NULL_FIELD: function(fieldName){return "(" + fieldName + ") = null";},
    EMPTY_ARRAY: function(fieldName){return "(" + fieldName + ") Array is Empty";},

    INFO_0: "Logger File Opened Successfully",
    IS_SELECTED: function(value){ return "(" + value + ") is selected successfully from Database";},
    IS_INSERTED: function(value){ return "(" + value + ") is inserted successfully in Database";},
    IS_DELETED:  function(value){ return "(" + value + ") is deleted successfully from Database";},
    IS_UPDATED:  function(value){ return "(" + value + ") is updated successfully in Database";},
    IS_FOUND:    function(value){ return "(" + value + ") is found in Database";},

    NOT_SELECTED: function(value){ return "(" + value + ") isn't selected from Database";},
    NOT_INSERTED: function(value){ return "(" + value + ") isn't inserted in Database";},
    NOT_DELETED:  function(value){ return "(" + value + ") isn't deleted from Database";},
    NOT_UPDATED:  function(value){ return "(" + value + ") isn't updated in Database";},
    NOT_FOUND:    function(value){ return "(" + value + ") isn't found in Database";},

    DELETE_NOT_FOUND: function(value){ return "(" + value + ") isn't found in Database to be deleted";},
    UPDATE_NOT_FOUND: function(value){ return "(" + value + ") isn't found in Database to be updated";},

    ALL_NOT_SELECTED: function(value){ return "(" + value + ") aren't selected from Database";},
    ALL_NOT_INSERTED: function(value){ return "(" + value + ") aren't inserted in Database";},
    INCOMPLETE_UPDATE: function(value){ return "(" + value + ") record isn't updated as it already has the same new values in database"; },

    ALL_SELECTED: function(value){ return "All (" + value + ") are selected successfully from Database";},
    ALL_INSERTED: function(value){ return "All (" + value + ") are inserted successfully in Database";},
    ALL_DELETED:  function(value){ return "All (" + value + ") are deleted successfully from Database";},
    ALL_UPDATED:  function(value){ return "All (" + value + ") are updated successfully in Database";},

    MANY_SELECTED: function(value){ return "More than one (" + value + ") is selected from Database";},
    MANY_INSERTED: function(value){ return "More than one (" + value + ") is to be inserted in Database";},
    MANY_DELETED:  function(value){ return "More than one (" + value + ") is to deleted from Database";},
    MANY_UPDATED:  function(value){ return "More than one (" + value + ") is to updated in Database";},
    MANY_FOUND:    function(value){ return "More than one (" + value + ") is found in Database";},

    FULL_INSERTED: function(value){ return "(" + value + ") data is fully inserted in Database";},

    TRANS_ROLLBACK: "Transaction is rolled back",
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

    createError: function(type, message){
        var err = new Error(message);
        err.status = 400;
        err.type = type;
        return err;
    }

};
