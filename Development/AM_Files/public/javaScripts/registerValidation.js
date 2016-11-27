/**
 * Created by Ahmed Mater on 10/7/2016.
 */

var clearMessages = function(mainDivID, spanID){
    $(mainDivID).removeClass("has-success");
    $(mainDivID).removeClass("has-error");
    $(spanID).remove();
};
var showErrorMessage = function(mainDivID, spanID, message){
    clearMessages(mainDivID, '#' + spanID);

    var html =
        "\n<div id=\"" + spanID + "\" class=\"form-group\">" +
            "\n<span class=\"col-lg-offset-4 col-lg-6 text-danger\">" + message + "</span>" +
        "\n</div>";

    $(mainDivID).addClass("has-error");
    $("#submitBtn").attr("disabled", "disabled");
    $(mainDivID).after(html);
};
var showSuccessMessage = function(mainDivID, spanID){
    clearMessages(mainDivID, '#' + spanID);

    $(mainDivID).addClass("has-success");
};

var baseURL = "http://localhost:3002";
var checkUserExist = function(){
    $("#submitBtn").attr("disabled", "disabled");
    var userExistCheckURL = baseURL + "/user/checkUserName";
    var namePattern = /^[A-Za-z ]{1,45}$/;
    var passwordPattern = /^[A-Za-z0-9]{5,20}$/;

    var inputIDs = {
        userName: '#userName',
        password: '#password',
        confirmPassword: '#confirmPassword',
        email: '#email',
        firstName: '#firstName',
        lastName: '#lastName',
        gender: '#gender',
        submit: '#submitBtn',

        dateOfBirth: {
            day: '#day',
            month: '#month',
            year: '#year'
        },
        job: '#job',
        university: '#university',
        college: '#college'
    };

    $(document).change(function() {
        if($(inputIDs.userName).val() && $(inputIDs.password).val() && $(inputIDs.confirmPassword).val()
            && $(inputIDs.email).val() && $(inputIDs.firstName).val() && $(inputIDs.lastName).val()
            && $(inputIDs.gender).val()) $(inputIDs.submit).removeAttr("disabled");
    });

    $(inputIDs.userName).change(function(){
        var userNamePattern = /^[A-Za-z0-9\_\.\-]+$/;
        var userNameValue = $(inputIDs.userName).val();

        var mainDivID = '#main_userNameDiv';
        var spanID = 'userErrorSpan';

        $.ajax({
            type: "GET",
            url: userExistCheckURL,
            data:{
                userName: userNameValue
            }, success: function(result){

                var exist = result[0];

                var passed = false;
                var errorMessage;

                if(userNameValue == '')
                    errorMessage = 'Please Enter User name';
                else if(!userNamePattern.test(userNameValue))
                    errorMessage = 'Only English Letters, Numbers, _ , - and . are allowed';
                else if(exist)
                    errorMessage = 'This User already Exists';
                else
                    passed =  true;

                if(!passed)
                    showErrorMessage(mainDivID, spanID, errorMessage);
                else
                    showSuccessMessage(mainDivID, spanID);
            },
            error: function(err){
                showErrorMessage(mainDivID, spanID, 'Server Error happen');
            }
        });
    });
    $(inputIDs.password).change(function(){
        var passwordValue = $(inputIDs.password).val();

        var passed = false;
        var errorMessage;

        if(passwordValue == '')
            errorMessage = 'Please Enter your Password';
        else if(passwordValue.length < 5 || passwordValue.length > 20)
            errorMessage = 'Password has to be from 5 to 20 characters';
        else if(!passwordPattern.test(passwordValue))
            errorMessage = 'Password has to be English Letters and Numbers only';
        else
            passed =  true;

        var mainDivID = '#main_passwordDiv';
        var spanID = 'passwordErrorSpan';

        if(!passed)
            showErrorMessage(mainDivID, spanID, errorMessage);
        else
            showSuccessMessage(mainDivID, spanID);
    });
    $(inputIDs.confirmPassword).change(function(){
        var passwordPattern = /^[A-Za-z0-9]{5,20}$/;
        var passwordValue = $(inputIDs.password).val();
        var confirmPasswordValue = $(inputIDs.confirmPassword).val();

        var passed = false;
        var errorMessage;

        if(confirmPasswordValue == '')
            errorMessage = 'Please Confirm your Password';
        else if(confirmPasswordValue.length < 5 || confirmPasswordValue.length > 20)
            errorMessage = 'Password has to be from 5 to 20 characters';
        else if(!passwordPattern.test(confirmPasswordValue))
            errorMessage = 'Password has to be Letters and Numbers only';
        else if(confirmPasswordValue != passwordValue)
            errorMessage = 'Passwords don\'t Match';
        else
            passed =  true;

        var mainDivID = '#main_confirmPasswordDiv';
        var spanID = 'confirmPasswordErrorSpan';

        if(!passed)
            showErrorMessage(mainDivID, spanID, errorMessage);
        else
            showSuccessMessage(mainDivID, spanID);
    });
    $(inputIDs.email).change(function() {
        var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var emailValue = $(inputIDs.email).val();

        var mainDivID = '#main_emailDiv';
        var spanID = 'emailErrorSpan';

        $.ajax({
            type: "GET",
            url: userExistCheckURL,
            data: {
                email: emailValue
            }, success: function (result) {

                var exist = result[0];

                var passed = false;
                var errorMessage;

                if(emailValue == '')
                    errorMessage = 'Please Enter Your Email';
                else if(!emailPattern.test(emailValue))
                    errorMessage = 'Invalid Email';
                else if(exist)
                    errorMessage = 'This Email already Exists';
                else
                    passed =  true;

                if(!passed)
                    showErrorMessage(mainDivID, spanID, errorMessage);
                else
                    showSuccessMessage(mainDivID, spanID);
            },
            error: function (err) {
                showErrorMessage(mainDivID, spanID, 'Server Error happen');
            }
        });
    });
    $(inputIDs.firstName).change(function(){
        var firstNameValue = $(inputIDs.firstName).val();

        var passed = false;
        var errorMessage;

        if(firstNameValue.length == 0)
            errorMessage = 'Please Enter your First Name';
        else if(!namePattern.test(firstNameValue))
            errorMessage = 'Invalid First Name';
        else
            passed =  true;

        var mainDivID = '#main_firstNameDiv';
        var spanID = 'firstNameErrorSpan';

        if(!passed)
            showErrorMessage(mainDivID, spanID, errorMessage);
        else
            showSuccessMessage(mainDivID, spanID);
    });
    $(inputIDs.lastName).change(function(){
        var lastNameValue = $(inputIDs.lastName).val();

        var passed = false;
        var errorMessage;

        if(lastNameValue.length == 0)
            errorMessage = 'Please Enter your Last Name';
        else if(!namePattern.test(lastNameValue))
            errorMessage = 'Invalid Last Name';
        else
            passed =  true;

        var mainDivID = '#main_lastNameDiv';
        var spanID = 'lastNameErrorSpan';

        if(!passed)
            showErrorMessage(mainDivID, spanID, errorMessage);
        else
            showSuccessMessage(mainDivID, spanID);
    });
    $(inputIDs.gender).change(function(){
        var genderPattern = /^(M|F)$/;
        var genderValue = $(inputIDs.gender).val();

        var passed = false;
        var errorMessage;

        if(genderValue.length == 0)
            errorMessage = 'Please Choose your Gender';
        else if(!genderPattern.test(genderValue))
            errorMessage = 'Invalid Gender';
        else
            passed =  true;

        var mainDivID = '#main_genderDiv';
        var spanID = 'genderErrorSpan';

        if(!passed)
            showErrorMessage(mainDivID, spanID, errorMessage);
        else
            showSuccessMessage(mainDivID, spanID);

    });
    $(inputIDs.dateOfBirth.day).change(function(){
        var dateOfBirthPattern = /^[0-9]{1,2}$/;
        var dayValue = $(inputIDs.dateOfBirth.day).val();
        var monthValue = $(inputIDs.dateOfBirth.month).val();

        var mainDivID = '#main_dateOfBirthDiv';
        var spanID = 'dateOfBirthErrorSpan';

        if(!dateOfBirthPattern.test(dayValue) || dayValue < 1 || dayValue > 31)
            showErrorMessage(mainDivID, spanID, 'Invalid Day Number');
        else if( ((monthValue == 4 || monthValue == 6 || monthValue == 9 || monthValue == 11) && (dayValue > 30) ) ||
         (monthValue == 2 && dayValue > 29) )
            showErrorMessage(mainDivID, spanID, 'Invalid Day Number');
        else
            showSuccessMessage(mainDivID, spanID);
    });
    $(inputIDs.dateOfBirth.month).change(function(){
        var dateOfBirthPattern = /^[0-9]{1,2}$/;
        var dayValue = $(inputIDs.dateOfBirth.day).val();
        var monthValue = $(inputIDs.dateOfBirth.month).val();

        var mainDivID = '#main_dateOfBirthDiv';
        var spanID = 'dateOfBirthErrorSpan';

        if(!dateOfBirthPattern.test(monthValue) || monthValue < 1 || monthValue > 12)
            showErrorMessage(mainDivID, spanID, 'Invalid Month Number');
        else if( ((monthValue == 4 || monthValue == 6 || monthValue == 9 || monthValue == 11) && (dayValue > 30) ) ||
            (monthValue == 2 && dayValue > 29) )
            showErrorMessage(mainDivID, spanID, 'Invalid Day Number');
        else
            showSuccessMessage(mainDivID, spanID);
    });
    $(inputIDs.dateOfBirth.year).change(function(){
        var dateOfBirthPattern = /^[0-9]{4}$/;
        var yearValue = $(inputIDs.dateOfBirth.year).val();
        var dayValue = $(inputIDs.dateOfBirth.day).val();
        var monthValue = $(inputIDs.dateOfBirth.month).val();

        var mainDivID = '#main_dateOfBirthDiv';
        var spanID = 'dateOfBirthErrorSpan';

        if(!dateOfBirthPattern.test(yearValue) || yearValue < 0)
            showErrorMessage(mainDivID, spanID, 'Invalid Year Number');
        else if(dayValue == null || monthValue == null)
            showErrorMessage(mainDivID, spanID, 'Choose Day and Month Values');
        else
            showSuccessMessage(mainDivID, spanID);
    });
    $(inputIDs.job).change(function(){
        var jobValue = $(inputIDs.job).val();

        var mainDivID = '#main_jobDiv';
        var spanID = 'jobErrorSpan';

        if(!namePattern.test(jobValue))
            showErrorMessage(mainDivID, spanID, 'Invalid Job Name');
        else
            showSuccessMessage(mainDivID, spanID);
    });
    $(inputIDs.university).change(function(){
        var universityValue = $(inputIDs.university).val();

        var mainDivID = '#main_universityDiv';
        var spanID = 'universityErrorSpan';

        if(!namePattern.test(universityValue))
            showErrorMessage(mainDivID, spanID, 'Invalid University Name');
        else
            showSuccessMessage(mainDivID, spanID);
    });
    $(inputIDs.college).change(function(){
        var collegeValue = $(inputIDs.college).val();

        var mainDivID = '#main_collegeDiv';
        var spanID = 'collegeErrorSpan';

        if(!namePattern.test(collegeValue))
            showErrorMessage(mainDivID, spanID, 'Invalid College Name');
        else
            showSuccessMessage(mainDivID, spanID);
    });

};
