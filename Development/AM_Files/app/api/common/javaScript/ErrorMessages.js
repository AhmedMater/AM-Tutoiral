/**
 * Created by Ahmed Mater on 10/7/2016.
 */

module.exports = {

    ERROR_1: 'Mandatory Field missing',
    ERROR_2: 'Invalid UserName',
    ERROR_3: 'Invalid Password or Confirmed Password',
    ERROR_4: 'Password and Confirmed Password Don\'t Match',
    ERROR_5: 'Invalid Email',
    ERROR_6: 'Invalid First Name',
    ERROR_7: 'Invalid Last Name',
    ERROR_8: 'Invalid Gender',
    ERROR_9: 'Invalid Job',
    ERROR_10: 'Invalid University',
    ERROR_11: 'Invalid College',
    ERROR_12: 'Invalid Date',
    ERROR_13: 'Invalid Day of Month',
    ERROR_14: 'Empty Course Pre-Requisite fields',
    ERROR_15: 'Empty Course Reference fields',

    INFO_0: "Logger File Opened Successfully",

    INFO_1: 'User Role is successfully retrieved',
    INFO_2: 'This User Role isn\'t found in Database',

    INFO_3: 'User Data are successfully retrieved',
    INFO_4: 'This User isn\'t found in Database',

    INFO_5: 'All User Roles are successfully retrieved',
    INFO_6: 'Fail to Retrieve the User Roles',

    INFO_7: 'User already found in Database',
    INFO_8: 'User isn\'t found in Database',

    INFO_9: 'All Course Levels are successfully retrieved',
    INFO_10: 'Fail to Retrieve the Course Levels',

    INFO_11: 'Course Level is successfully retrieved',
    INFO_12: 'This Course Level isn\'t found in Database',

    INFO_13: 'All Course Types are successfully retrieved',
    INFO_14: 'Fail to Retrieve the Course Types',

    INFO_15: 'Course Type is successfully retrieved',
    INFO_16: 'This Course Type isn\'t found in Database',

    INFO_17: 'All Reference Types are successfully retrieved',
    INFO_18: 'Fail to Retrieve the Reference Types',

    INFO_19: 'Reference Type is successfully retrieved',
    INFO_20: 'This Reference Type isn\'t found in Database',

    createError: function(name, code, message){
        var err = new Error(message);
        err.status = code;
        err.name = name;
        return err;
    }

};
