/**
 * Created by Ahmed Mater on 10/7/2016.
 */

module.exports = {

    error_1_MandatoryFieldMissing: function(fieldName){return "Error 1: Mandatory Field " + fieldName + " equal null";},
    error_2_InvalidData: function(fieldName){return "Error 2: " + fieldName + " Invalid input Data ";},
    error_3_LongLengthData: function(fieldName){return "Error 3: " + fieldName + " is too long ";},
    error_4_ShortLengthData: function(fieldName){return "Error 4: " + fieldName + " is too short ";},
    error_5_AlreadyExist: function(fieldName){return "Error 5: " + fieldName + " already Exists ";},
    error_6_DateInFuture: function(fieldName){return "Error 6: " + fieldName + " can't be in Future ";},
    error_7_PasswordNotMatch: function(fieldName){return "Error 7: " + fieldName + " don't Match ";},
    ERROR_8_PasswordEQUserName: "Error 8: Password can't be equal to Username",

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
