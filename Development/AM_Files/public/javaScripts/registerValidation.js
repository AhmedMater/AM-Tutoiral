/**
 * Created by Ahmed Mater on 10/7/2016.
 */

var clearMessages = function(mainDivName, errorSpan){
    $(mainDivName).removeClass("has-success");
    $(mainDivName).removeClass("has-error");
    $(errorSpan).remove();
};
var showErrorMessage = function(mainDivName, divName, errorSpan, message){
    clearMessages(mainDivName, '#' + errorSpan);

    $(mainDivName).addClass("has-error");

    var spanTag = document.createElement("span");

    $(spanTag).attr({
        "id" : errorSpan,
        "class": "help-block col-lg-12"
    }).text(message);

    $("#submitBtn").attr("disabled", "disabled");
    $(divName).append(spanTag);
};
var showSuccessMessage = function(mainDivName, errorSpan){
    clearMessages(mainDivName, '#' + errorSpan);

    $(mainDivName).addClass("has-success");
};

var checkUserExist = function(){
    $("#submitBtn").attr("disabled", "disabled");
    var userExistCheckURL = "http://localhost:3002/user/checkUserName";
    var namePattern = /^[A-Za-z ]+$/;

    $( document ).change(function() {
        if($('#userName').val() && $('#password').val() && $('#email').val()
            && $('#firstName').val() && $('#lastName').val() && $('#gender').val())
            $("#submitBtn").removeAttr("disabled");
    });

    $('#userName').change(function() {
        var userNamePattern = /^[A-Za-z0-9\_\.\-]+$/;
        var userNameValue = $('#userName').val();

        $.ajax({
            type: "GET",
            url: userExistCheckURL,
            data:{
                userName: userNameValue
            }, success: function(result){

                var exist = result[0];

                if(userNameValue == '')
                    showErrorMessage('#main_userNameDiv', '#userNameDiv', 'userErrorSpan', 'Please Enter User name');
                else if(!userNamePattern.test(userNameValue))
                    showErrorMessage('#main_userNameDiv', '#userNameDiv', 'userErrorSpan', 'Only Letters, Numbers, _ , - and . are allowed');
                else if(exist)
                    showErrorMessage('#main_userNameDiv', '#userNameDiv', 'userErrorSpan', 'This User already Exists');
                else
                    showSuccessMessage('#main_userNameDiv', 'userErrorSpan');

            },
            error: function(err){
                console.log(err);
            }
        });
    });
    $('#password').change(function(){
        var passwordPattern = /^[A-Za-z0-9]{5,20}$/;
        var passwordValue = $('#password').val();


        if(passwordValue == '')
            showErrorMessage('#main_passwordDiv', '#passwordDiv', 'passwordErrorSpan', 'Please Enter your Password');
        else if(passwordValue.length < 5 || passwordValue.length > 20)
            showErrorMessage('#main_passwordDiv', '#passwordDiv', 'passwordErrorSpan', 'password has to be from 5 to 20 characters');
        else if(!passwordPattern.test(passwordValue))
            showErrorMessage('#main_passwordDiv', '#passwordDiv', 'passwordErrorSpan', 'password has to be Letters and Numbers only');
        else
            showSuccessMessage('#main_passwordDiv', 'passwordErrorSpan');

    });
    $('#email').change(function() {
        var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var emailValue = $('#email').val();

        $.ajax({
            type: "GET",
            url: userExistCheckURL,
            data: {
                email: emailValue
            }, success: function (result) {

                var exist = result[0];

                if(emailValue == '')
                    showErrorMessage('#main_emailDiv', '#emailDiv', 'emailErrorSpan', 'Please Enter Your Email');
                else if(!emailPattern.test(emailValue))
                    showErrorMessage('#main_emailDiv', '#emailDiv', 'emailErrorSpan', 'Please Enter Valid Email');
                else if(exist)
                    showErrorMessage('#main_emailDiv', '#emailDiv', 'emailErrorSpan', 'This Email already Exists');
                else
                    showSuccessMessage('#main_emailDiv', 'emailErrorSpan');

            },
            error: function (err) {
                console.log('fail: ' + err.message);
            }
        });
    });
    $('#firstName').change(function(){
        var firstNameValue = $('#firstName').val();

        if(firstNameValue.length == 0)
            showErrorMessage('#main_firstNameDiv', '#firstNameDiv', 'firstNameErrorSpan', 'Please Enter your First Name');
        else if(!namePattern.test(firstNameValue))
            showErrorMessage('#main_firstNameDiv', '#firstNameDiv', 'firstNameErrorSpan', 'Enter Valid First Name');
        else
            showSuccessMessage('#main_firstNameDiv', 'firstNameErrorSpan');
    });
    $('#lastName').change(function(){
        var lastNameValue = $('#lastName').val();

        if(lastNameValue.length == 0)
            showErrorMessage('#main_lastNameDiv', '#lastNameDiv', 'lastNameErrorSpan', 'Please Enter your Last Name');
        else if(!namePattern.test(lastNameValue))
            showErrorMessage('#main_lastNameDiv', '#lastNameDiv', 'lastNameErrorSpan', 'Enter Valid First Name');
        else
            showSuccessMessage('#main_lastNameDiv', 'lastNameErrorSpan');
    });
    $('#gender').change(function(){
        var genderPattern = /^male|female$/;
        var genderValue = $('#gender').val();

        if(genderValue.length == 0)
            showErrorMessage('#main_genderDiv', '#genderDiv', 'genderErrorSpan', 'Please Choose your Gender');
        else if(!genderPattern.test(genderValue))
            showErrorMessage('#main_genderDiv', '#genderDiv', 'genderErrorSpan', 'Choose valid Gender');
        else
            showSuccessMessage('#main_genderDiv', 'genderErrorSpan');

    });
    $('#dateOfBirth').change(function(){
        var dateOfBirthPattern = /^\d{4}[./-]\d{2}[./-]\d{2}$/;
        var dateOfBirthValue = $('#dateOfBirth').val();

        if(!dateOfBirthPattern.test(dateOfBirthValue))
            showErrorMessage('#main_dateOfBirthDiv', '#dateOfBirthDiv', 'dateOfBirthErrorSpan', 'Enter Valid Date');
        else
            showSuccessMessage('#main_dateOfBirthDiv', 'dateOfBirthErrorSpan');
    });
    $('#job').change(function(){
        var jobValue = $('#job').val();

        if(!namePattern.test(jobValue))
            showErrorMessage('#main_jobDiv', '#jobDiv', 'jobErrorSpan', 'Enter Valid Job');
        else
            showSuccessMessage('#main_jobDiv', 'jobErrorSpan');
    });
    $('#university').change(function(){
        var universityValue = $('#university').val();

        if(!namePattern.test(universityValue))
            showErrorMessage('#main_universityDiv', '#universityDiv', 'universityErrorSpan', 'Enter Valid University');
        else
            showSuccessMessage('#main_universityDiv', 'universityErrorSpan');
    });
    $('#college').change(function(){
        var collegeValue = $('#college').val();

        if(!namePattern.test(collegeValue))
            showErrorMessage('#main_collegeDiv', '#collegeDiv', 'collegeErrorSpan', 'Enter Valid College');
        else
            showSuccessMessage('#main_collegeDiv', 'collegeErrorSpan');
    });

};
