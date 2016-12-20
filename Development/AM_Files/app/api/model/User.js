/**
 * Created by Ahmed Mater on 12/19/2016.
 */

var exports = module.exports = {};

exports.setUser = function(row, ModelCallback){
    if(row == null)
        return ModelCallback(null, null);
    else {
        var User = {
            userID: row.userID,
            userName: row.user_name,
            email: row.email,
            userRole: {
                id: row.roleID,
                name: row.roleName,
                value: row.roleValue
            },
            dateOfRegistration: row.date_of_registration,
            firstName: row.first_name,
            lastName: row.last_name,
            gender: (row.gender == 'M') ? 'Male' : 'Female',
            mailSubscribe: row.mail_subscribe,
            university: row.university,
            college: row.college,
            job: row.job,
            country: row.country,
            dateOfBirth: row.date_of_birth,
            mobileNumber: row.mobile_number,
            userPic: row.profile_pic
        };

        return ModelCallback(null, User);
    }
};

exports.setAllUsers = function(rows, ModelCallback){
    if(rows == null)
        return ModelCallback(null, null);
    else {
        var Users = [];

        for(var i=0; i<rows.length; i++)
            Users.push({
                userID: rows[i].userID,
                userName: rows[i].user_name,
                email: rows[i].email,
                userRole: {
                    id: rows[i].roleID,
                    name: rows[i].roleName,
                    value: rows[i].roleValue
                },
                dateOfRegistration: rows[i].date_of_registration,
                firstName: rows[i].first_name,
                lastName: rows[i].last_name,
                gender: (rows[i].gender == 'M') ? 'Male' : 'Female',
                mailSubscribe: rows[i].mail_subscribe,
                university: rows[i].university,
                college: rows[i].college,
                job: rows[i].job,
                country: rows[i].country,
                dateOfBirth: rows[i].date_of_birth,
                mobileNumber: rows[i].mobile_number,
                userPic: rows[i].profile_pic
            });            

        return ModelCallback(null, Users);
    }
};