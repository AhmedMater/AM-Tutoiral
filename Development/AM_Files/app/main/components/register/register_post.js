/**
 * Created by Ahmed Mater on 10/6/2016.
 */

var config = require('../../../configuration');
var userService = require('../../../' + config.Services.User);

var Regex = require('regex');
var exports = module.exports = {};

exports.go = function(req,res) {
    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var genderPattern = /^male|female$/;
    var datePattern = /^\d{4}[./-]\d{2}[./-]\d{2}$/;
    var namePattern = /^[A-Za-z ]+$/;
    var userNamePattern = /^[A-Za-z0-9\_\.\-]+$/;
    var passwordPattern = /^[A-Za-z0-9]{5,20}$/;

    var userData = {
        user_name: null,
        password: null,
        first_name: null,
        last_name: null,
        email: null,
        gender: null,
        date_of_birth: null,
        mail_subscribe: null,

        user_role: null,
        university: null,
        college: null,
        job: null,
        country: null,
        profile_pic: null,
        mobile_number: null
    };

    userData.user_name = (userNamePattern.test(req.body.userName)) ? req.body.userName : null;
    userData.password = (passwordPattern.test(req.body.password)) ? req.body.password : null;
    userData.first_name = (namePattern.test(req.body.firstName)) ? req.body.firstName : null;
    userData.last_name = (namePattern.test(req.body.lastName)) ? req.body.lastName : null;
    userData.email = (emailPattern.test(req.body.email)) ? req.body.email : null;
    userData.gender = (genderPattern.test(req.body.gender)) ? req.body.gender : null;
    userData.date_of_birth = (datePattern.test(req.body.dateOfBirth)) ? req.body.dateOfBirth : null;
    userData.mail_subscribe = (req.body.mailSubscribe == 'on') ? '1' : '0';
    //var userName = null;
    //if(userNamePattern.test(req.body.userName))
        //userName = req.body.userName;
        //userData.user_name = req.body.userName;

    //var password = null;
    //if(passwordPattern.test(req.body.password))
        //password = req.body.password;
        //userData.password = req.body.password;

    //var firstName = null;
    //if(namePattern.test(req.body.firstName))
        //firstName = req.body.firstName;
        //userData.first_name = req.body.firstName;

    //var lastName = null;
    //if(namePattern.test(req.body.lastName))
        //lastName = req.body.lastName;
        //userData.last_name = req.body.lastName;

    //var email = null;
    //if(emailPattern.test(req.body.email))
        //email = req.body.email;
        //userData.last_name = req.body.lastName;

    //var gender = null;
    //if(genderPattern.test(req.body.gender))
        //gender = req.body.gender;
        //userData.gender = req.body.gender;

    //var dateOfBirth = null;
    //if(datePattern.test(req.body.dateOfBirth))
        //dateOfBirth = req.body.dateOfBirth;
        //userData.date_of_birth = req.body.dateOfBirth;

    //var mailSubscribe = '0';
    //if(req.body.mailSubscribe == 'on')
    //    userData.mail_subscribe = '1';
    //else
    //    userData.mail_subscribe = '0';
        //mailSubscribe = '1';


    try{
        //userService.insertUser(userName, password, email, req.body.userRole, firstName, lastName, gender,
        //    req.body.university, req.body.college, req.body.job, req.body.country, dateOfBirth, mailSubscribe);
        userService.insertUser(userData);
    } catch (e){
        console.log(e.message);
    }

    res.redirect('/');
}
