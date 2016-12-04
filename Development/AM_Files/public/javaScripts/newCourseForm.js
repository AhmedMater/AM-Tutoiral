/**
 * Created by ahmed.motair on 11/24/2016.
 */

var courseObjectivesNum = 1;
var courseContentNum = 1;
var coursePreRequisiteNum = 1;
var courseReferenceNum = 1;

var addNewCourseObjective = function(){
    var html =
        "\n<div class=\"form-group\" id=\"main_courseObjective" + (courseObjectivesNum+1) + "Div\">" +
            "\n<label class=\"control-label col-lg-1\">" + (courseObjectivesNum+1) + "</label>" +

            $('#courseObjectiveDiv')[0].outerHTML +

            "\n<div class=\"col-lg-1\">" +
                "\n<button type=\"button\" class=\"btn btn-danger btn-circle\" onclick=\"removeNewCourseObjective()\">" +
                    "\n<i class=\"icon-minus\"></i>" +
                "\n</button>" +
            "\n</div>" +

        "\n</div>";
    $("#main_courseObjective" + (courseObjectivesNum) + "Div").after(html);
    courseObjectivesNum++;
};
var removeNewCourseObjective = function(){
    $("#main_courseObjective" + (courseObjectivesNum) + "Div").remove();
    courseObjectivesNum--;

};

var addNewCourseContent = function(){
    console.log($('#courseContentDiv'));
    var html =
        "\n<div class=\"form-group\" id=\"main_courseContent" + (courseContentNum+1) + "Div\">" +
            "\n<label class=\"control-label col-lg-1\">" + (courseContentNum+1) + "</label>" +

            $('#courseContentDiv')[0].outerHTML +

            "\n<div class=\"col-lg-1\">" +
                "\n<button type=\"button\" class=\"btn btn-danger btn-circle\" onclick=\"removeNewCourseContent()\">" +
                    "\n<i class=\"icon-minus\"></i>" +
                "\n</button>" +
            "\n</div>" +

        "\n</div>";
    $("#main_courseContent" + (courseContentNum) + "Div").after(html);
    courseContentNum++;
};
var removeNewCourseContent = function(){
    $("#main_courseContent" + (courseContentNum) + "Div").remove();
    courseContentNum--;

};

var addNewCoursePreRequisite = function(){
    var html =
        "\n<div class=\"form-group\" id=\"main_coursePreRequisite" + (coursePreRequisiteNum+1) + "Div\">" +
            "\n<label class=\"control-label col-lg-1\">" + (coursePreRequisiteNum+1) + "</label>" +

            $('#coursePreRequisiteNameDiv')[0].outerHTML +
            $('#coursePreRequisiteURLDiv')[0].outerHTML +

            "\n<div class=\"col-lg-1\">" +
                "\n<button type=\"button\" class=\"btn btn-danger btn-circle\" onclick=\"removeNewCoursePreRequisite()\">" +
                    "\n<i class=\"icon-minus\"></i>" +
                "\n</button>" +
            "\n</div>" +

        "\n</div>";
    $("#main_coursePreRequisite" + (coursePreRequisiteNum) + "Div").after(html);
    coursePreRequisiteNum++;
};
var removeNewCoursePreRequisite = function(){
    $("#main_coursePreRequisite" + (coursePreRequisiteNum) + "Div").remove();
    coursePreRequisiteNum--;

};

var addNewCourseReference = function (){
    var html =
        "\n<div class=\"form-group\" id=\"main_courseReference" + (courseReferenceNum+1) + "Div\">" +
            "\n<label class=\"control-label col-lg-1\">" + (courseReferenceNum+1) + "</label>" +

        $('#courseReferenceNameDiv')[0].outerHTML +
        $('#courseReferenceTypeDiv')[0].outerHTML +
        $('#courseReferenceURLDiv')[0].outerHTML +

            "\n<div class=\"col-lg-1\" id='courseReferencePlusDiv'>" +
                "\n<button type=\"button\" class=\"btn btn-danger btn-circle\" onclick=\"removeNewCourseReference()\">" +
                    "\n<i class=\"icon-minus\"></i>" +
                "\n</button>" +
            "\n</div>" +

        "\n</div>";

    $("#main_courseReference" + (courseReferenceNum) + "Div").after(html);
    courseReferenceNum++;
};
var removeNewCourseReference = function(){
    $("#main_courseReference" + (courseReferenceNum) + "Div").remove();
    courseReferenceNum--;

};

var clearMessages = function(mainDivID, spanID){
    $(mainDivID).removeClass("has-success");
    $(mainDivID).removeClass("has-error");
    $(spanID).remove();
};
var showErrorMessage = function(mainDivID, spanID, message){
    clearMessages(mainDivID, '#' + spanID);

    var html =
        "\n<div id=\"" + spanID + "\" class=\"form-group\">" +
        "\n<span class=\"col-lg-offset-2 col-lg-6 text-danger\">" + message + "</span>" +
        "\n</div>";

    $(mainDivID).addClass("has-error");
    $("#submitBtn").attr("disabled", "disabled");
    $(mainDivID).after(html);
};
var showSuccessMessage = function(mainDivID, spanID){
    clearMessages(mainDivID, '#' + spanID);

    $(mainDivID).addClass("has-success");
};


var checkCourseData = function() {
    $("#submitBtn").attr("disabled", "disabled");

    var isCourseFoundURL = "http://localhost:3002/course/isCourseFound";
    var RegExps = {
        names: /^[A-Za-z0-9 -\/]{5,70}$/,
        description: /^[A-Za-z0-9 -\/]{0,200}$/,
        numbers: /[0-9]+/,
        youTubePlayList: /^http:\/\/(?:www\.)?youtube\.com\/watch\?(?:&.*)*((?:v=([a-zA-Z0-9_\-]{11})(?:&.*)*)|(?:list=([a-zA-Z0-9_\-]{18})(?:&.*)*&v=([a-zA-Z0-9_\-]{11})))(?:&.*)*(?:\#.*)*$/,
        url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    };

    var inputIDs = {
        courseName: '#courseName',
        coursePeriod: '#coursePeriod',
        courseType: '#courseType',
        courseLevel: '#courseLevel',
        youTubePlayList: '#youTubePlayList',

        courseObjective: '#courseObjective',
        courseContent: '#courseContent',

        coursePreRequisiteName: '#coursePreRequisiteName',
        coursePreRequisiteURL: '#coursePreRequisiteURL',

        courseReferenceName: '#courseReferenceName',
        courseReferenceTypeID: '#courseReferenceTypeID',
        courseReferenceURL: '#courseReferenceURL'
    };

    $(document).change(function() {
        if($(inputIDs.courseContent).val() && $(inputIDs.youTubePlayList).val() && $(inputIDs.courseObjective).val()
            && $(inputIDs.courseName).val() && $(inputIDs.coursePeriod).val() && $(inputIDs.courseType).val()
            && $(inputIDs.courseLevel).val()){

            var isDisabled = true;

            if($(inputIDs.coursePreRequisiteName).val() || $(inputIDs.coursePreRequisiteURL).val())
                if($(inputIDs.coursePreRequisiteName).val() && $(inputIDs.coursePreRequisiteURL).val())
                    isDisabled = false;
                else
                    isDisabled = true;

            if($(inputIDs.courseReferenceName).val() || $(inputIDs.courseReferenceTypeID).val() || $(inputIDs.courseReferenceURL).val())
                if($(inputIDs.courseReferenceName).val() && $(inputIDs.courseReferenceTypeID).val() && $(inputIDs.courseReferenceURL).val())
                    isDisabled = false;
                else
                    isDisabled = true;

            if(!isDisabled)
                $(inputIDs.submit).removeAttr("disabled");
        }
    });

    $(inputIDs.courseName).change(function(){
        var courseNameValue = $(inputIDs.courseName).val();

        var mainDivID = '#main_courseNameDiv';
        var spanID = 'courseNameErrorSpan';

        $.ajax({
            type: "GET",
            url: isCourseFoundURL,
            data:{
                courseName: courseNameValue
            }, success: function(isFound){


                var passed = false;
                var errorMessage;

                if(courseNameValue == '')
                    errorMessage = 'Please Enter Course name';
                else if(!RegExps.names.test(courseNameValue))
                    errorMessage = 'Only English Letters, Numbers, Space, / and - are allowed';
                else if(courseNameValue.length > 70 || courseNameValue.length < 5)
                    errorMessage = 'Course name has to be from 5 to 70 Letters';
                else if(isFound)
                    errorMessage = 'This Course already Exists';
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
    $(inputIDs.coursePeriod).change(function(){
        var coursePeriodValue = $(inputIDs.coursePeriod).val();

        var passed = false;
        var errorMessage;

        if(coursePeriodValue == '')
            errorMessage = 'Please Enter the estimated Course Period';
        else if(!RegExps.numbers.test(coursePeriodValue))
            errorMessage = 'Period has to be number only';
        else
            passed =  true;

        var mainDivID = '#main_coursePeriodDiv';
        var spanID = 'coursePeriodErrorSpan';

        if(!passed)
            showErrorMessage(mainDivID, spanID, errorMessage);
        else
            showSuccessMessage(mainDivID, spanID);
    });
    $(inputIDs.courseLevel).change(function(){
        var courseLevelValue = $(inputIDs.courseLevel).val();

        var passed = false;
        var errorMessage;

        if(courseLevelValue == '')
            errorMessage = 'Please choose Course Level';
        else if(!RegExps.numbers.test(courseLevelValue))
            errorMessage = 'Invalid Course Level';
        else
            passed =  true;

        var mainDivID = '#main_courseLevelDiv';
        var spanID = 'courseLevelErrorSpan';

        if(!passed)
            showErrorMessage(mainDivID, spanID, errorMessage);
        else
            showSuccessMessage(mainDivID, spanID);
    });
    $(inputIDs.courseType).change(function() {
        var courseTypeValue = $(inputIDs.courseType).val();

        var passed = false;
        var errorMessage;

        if(courseTypeValue == '')
            errorMessage = 'Please choose Course Type';
        else if(!RegExps.numbers.test(courseTypeValue))
            errorMessage = 'Invalid Course Type';
        else
            passed =  true;

        var mainDivID = '#main_courseTypeDiv';
        var spanID = 'courseTypeErrorSpan';

        if(!passed)
            showErrorMessage(mainDivID, spanID, errorMessage);
        else
            showSuccessMessage(mainDivID, spanID);
    });
    $(inputIDs.youTubePlayList).change(function(){
        var youTubePlayListValue = $(inputIDs.youTubePlayList).val();

        var mainDivID = '#main_youTubePlayListDiv';
        var spanID = 'youTubePlayListErrorSpan';

        $.ajax({
            type: "GET",
            url: isCourseFoundURL,
            data:{
                youTubePlaylist: youTubePlayListValue
            }, success: function(isFound){


                var passed = false;
                var errorMessage;

                if(youTubePlayListValue == '')
                    errorMessage = 'Please Enter The YouTube Playlist URL';
                else if(!RegExps.youTubePlayList.test(youTubePlayListValue))
                    errorMessage = 'Invalid YouTube Playlist URL';
                else if(isFound)
                    errorMessage = 'This Course already Exists';
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
    $(inputIDs.description).change(function(){
        var descriptionValue = $(inputIDs.description).val();

        var passed = false;
        var errorMessage;

        if(!RegExps.names.test(descriptionValue))
            errorMessage = 'Only English Letters, Numbers, Space, / and - are allowed';
        else if(descriptionValue.length > 200)
            errorMessage = 'The Course Description can\'t be more than 200 Letters';
        else
            passed =  true;

        var mainDivID = '#main_descriptionDiv';
        var spanID = 'descriptionErrorSpan';

        if(!passed)
            showErrorMessage(mainDivID, spanID, errorMessage);
        else
            showSuccessMessage(mainDivID, spanID);
    });
    $(inputIDs.courseObjective).change(function(){
        var courseObjectiveValue = $(inputIDs.courseObjective).val();

        var passed = false;
        var errorMessage;

        if(courseObjectiveValue.length == 0)
            errorMessage = 'Please Enter The Course Objective';
        else if(!RegExps.names.test(courseObjectiveValue))
            errorMessage = 'Only English Letters, Numbers, Space, / and - are allowed';
        else if(courseObjectiveValue.length > 70 || courseObjectiveValue.length < 5)
            errorMessage = 'Course Objective has to be from 5 to 70 Letters';
        else
            passed =  true;

        var mainDivID = '#main_courseObjective' + courseObjectivesNum + 'Div';
        var spanID = 'courseObjectiveErrorSpan';

        if(!passed)
            showErrorMessage(mainDivID, spanID, errorMessage);
        else
            showSuccessMessage(mainDivID, spanID);
    });
    $(inputIDs.courseContent).change(function(){
        var courseContentValue = $(inputIDs.courseContent).val();

        var passed = false;
        var errorMessage;

        if(courseContentValue.length == 0)
            errorMessage = 'Please Enter The Course Content';
        else if(!RegExps.names.test(courseContentValue))
            errorMessage = 'Only English Letters, Numbers, Space, / and - are allowed';
        else if(courseContentValue.length > 70 || courseContentValue.length < 5)
            errorMessage = 'Course Content has to be from 5 to 70 Letters';
        else
            passed =  true;

        var mainDivID = '#main_courseContent' + courseContentNum + 'Div';
        var spanID = 'courseContentErrorSpan';

        if(!passed)
            showErrorMessage(mainDivID, spanID, errorMessage);
        else
            showSuccessMessage(mainDivID, spanID);
    });
    $(inputIDs.coursePreRequisiteName).change(function(){
        var coursePreRequisiteNameValue = $(inputIDs.coursePreRequisiteName).val();

        var passed = false;
        var errorMessage;

        if(!RegExps.names.test(coursePreRequisiteNameValue))
            errorMessage = 'Only English Letters, Numbers, Space, / and - are allowed';
        else if(!$(inputIDs.coursePreRequisiteName).val())
            errorMessage = 'Please Enter The Pre-Requisite URL';
        else if(coursePreRequisiteNameValue.length > 70 || coursePreRequisiteNameValue.length < 5)
            errorMessage = 'Pre-Requisite Name has to be from 5 to 70 Letters';
        else
            passed =  true;

        var mainDivID = '#main_coursePreRequisite' + coursePreRequisiteNum + 'Div';
        var spanID = 'coursePreRequisiteErrorSpan';

        if(!passed)
            showErrorMessage(mainDivID, spanID, errorMessage);
        else
            showSuccessMessage(mainDivID, spanID);
    });
    $(inputIDs.coursePreRequisiteURL).change(function(){
        var coursePreRequisiteURLValue = $(inputIDs.coursePreRequisiteURL).val();

        var passed = false;
        var errorMessage;

        if(!RegExps.url.test(coursePreRequisiteURLValue))
            errorMessage = 'Invalid URL';
        else if(!$(inputIDs.coursePreRequisiteName).val())
            errorMessage = 'Please Enter The Pre-Requisite Name';
        else
            passed =  true;

        var mainDivID = '#main_coursePreRequisite' + coursePreRequisiteNum + 'Div';
        var spanID = 'coursePreRequisiteErrorSpan';

        if(!passed)
            showErrorMessage(mainDivID, spanID, errorMessage);
        else
            showSuccessMessage(mainDivID, spanID);
    });
    $(inputIDs.courseReferenceName).change(function(){
        var courseReferenceNameValue = $(inputIDs.courseReferenceName).val();

        var passed = false;
        var errorMessage;

        if(!RegExps.names.test(courseReferenceNameValue))
            errorMessage = 'Only English Letters, Numbers, Space, / and - are allowed';
        else if(!$(inputIDs.courseReferenceTypeID).val())
            errorMessage = 'Please Choose The Reference Type';
        else if(!$(inputIDs.courseReferenceURL).val())
            errorMessage = 'Please Enter The Reference URL';
        else if(courseReferenceNameValue.length > 70 || courseReferenceNameValue.length < 5)
            errorMessage = 'Reference Name has to be from 5 to 70 Letters';
        else
            passed =  true;

        var mainDivID = '#main_courseReference' + courseReferenceNum + 'Div';
        var spanID = 'courseReferenceErrorSpan';

        if(!passed)
            showErrorMessage(mainDivID, spanID, errorMessage);
        else
            showSuccessMessage(mainDivID, spanID);
    });
    $(inputIDs.courseReferenceTypeID).change(function(){
        var courseReferenceTypeIDValue = $(inputIDs.courseReferenceTypeID).val();

        var passed = false;
        var errorMessage;

        if(!RegExps.numbers.test(courseReferenceTypeIDValue) || courseReferenceTypeIDValue.length < 0)
            errorMessage = 'Invalid Reference Type';
        else if(!$(inputIDs.courseReferenceName).val())
            errorMessage = 'Please Choose The Reference Name';
        else if(!$(inputIDs.courseReferenceURL).val())
            errorMessage = 'Please Enter The Reference URL';
        else
            passed =  true;

        var mainDivID = '#main_courseReference' + courseReferenceNum + 'Div';
        var spanID = 'courseReferenceErrorSpan';

        if(!passed)
            showErrorMessage(mainDivID, spanID, errorMessage);
        else
            showSuccessMessage(mainDivID, spanID);
    });
    $(inputIDs.courseReferenceURL).change(function(){
        var courseReferenceURLValue = $(inputIDs.courseReferenceURL).val();

        var passed = false;
        var errorMessage;

        if(!RegExps.url.test(courseReferenceURLValue))
            errorMessage = 'Invalid URL';
        else if(!$(inputIDs.courseReferenceName).val())
            errorMessage = 'Please Enter The Reference Name';
        else if(!$(inputIDs.courseReferenceTypeID).val())
            errorMessage = 'Please Choose The Reference Type';
        else
            passed =  true;

        var mainDivID = '#main_courseReference' + courseReferenceNum + 'Div';
        var spanID = 'courseReferenceErrorSpan';

        if(!passed)
            showErrorMessage(mainDivID, spanID, errorMessage);
        else
            showSuccessMessage(mainDivID, spanID);
    });

};