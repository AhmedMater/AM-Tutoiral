/**
 * Created by Ahmed Mater on 10/7/2016.
 */

module.exports = {

    MANDATORY_NULL_FIELD: function(fieldName){return "Error: Mandatory Field " + fieldName + " = null";},
    MANDATORY_EMPTY_FIELD: function(fieldName){return "Error: Mandatory Field " + fieldName + " has no value";},
    INVALID_FIELD: function(fieldName){return "Error: Invalid " + fieldName;},
    LONG_LENGTH_FIELD: function(fieldName){return "Error: " + fieldName + " is too long ";},
    SHORT_LENGTH_FIELD: function(fieldName){return "Error: " + fieldName + " is too short ";},
    VALUE_ALREADY_EXIST: function(fieldName){return "Error: " + fieldName + " already exists ";},
    DATE_IN_FUTURE: function(fieldName){return "Error: " + fieldName + " can't be in future ";},
    PASSWORD_NOT_MATCH: function(password1, password2){return "Error: " + password1 + " doesn't match " + password2;},
    PASSWORD_EQ_USERNAME: "Error: Password can't be equal to Username",
    NULL_FIELD: function(fieldName){return "Error: " + fieldName + " = null";},

    INFO_0: "Logger File Opened Successfully",
    info_1_Found: function(value){ return "Info 1: " + value + " is Successfully retrieved From Database";},
    info_2_NotFound: function(value){ return "Info 2: " + value + " isn't found in the Database";},
    info_3_SuccessfullyInserted: function(value){ return "Info 3: " + value + " is successfully inserted in the Database";},
    info_4_AllFound: function(value){ return "Info 4: All " + value + " are Successfully retrieved From Database";},
    info_5_AllNotFound: function(value){ return "Info 5: No " + value + " found in the Database";},

    createError: function(name, message){
        var err = new Error(message);
        err.status = 400;
        err.name = name;
        return err;
    }

};
