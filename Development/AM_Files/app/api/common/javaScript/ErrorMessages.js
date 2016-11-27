/**
 * Created by Ahmed Mater on 10/7/2016.
 */

var exports = module.exports = {
    SERVER_ERROR: "Server Error",
    DATABASE_ERROR: "Database Error",
    AUTHORIZATION_ERROR: "Authorization Error",

    ERROR_1 : 'Mandatory Field missing',
    ERROR_2 : 'Invalid UserName',
    ERROR_3 : 'Invalid Password or Confirmed Password',
    ERROR_4 : 'Password and Confirmed Password Don\'t Match',
    ERROR_5 : 'Invalid Email',
    ERROR_6 : 'Invalid First Name',
    ERROR_7 : 'Invalid Last Name',
    ERROR_8 : 'Invalid Gender',
    ERROR_9 : 'Invalid Job',
    ERROR_10 : 'Invalid University',
    ERROR_11 : 'Invalid College',
    ERROR_12 : 'Invalid Date',
    ERROR_13 : 'Invalid Day of Month',

    INFO_1 : 'User Role is successfully retrieved',
    INFO_2 : 'This User Role isn\'t found in Database',

    INFO_3 : 'User Data are successfully retrieved',
    INFO_4 : 'This User isn\'t found in Database',

    INFO_5 : 'All User Roles are successfully retrieved',
    INFO_6 : 'Fail to Retrieve the User Roles',

    createError: function(name, code, message){
        var err = new Error(message);
        err.status = code;
        err.name = name;
        return err;
    }

};
