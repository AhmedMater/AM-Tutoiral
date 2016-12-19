/**
 * Created by Ahmed Mater on 12/19/2016.
 */

var exports = module.exports = {};

exports.setUser = function(rows, ModelCallback){
    if(rows == null)
        return ModelCallback(null, null);
    else {
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

        return ModelCallback(null, User);
    }
};