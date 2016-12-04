/**
 * Created by Ahmed Mater on 12/4/2016.
 */

/**
 * Created by ahmed.motair on 11/24/2016.
 */

var chapterObjectivesNum = 1;
var chapterPreRequisiteNum = 1;

var addNewChapterObjective = function(){
    var html =
        "\n<div class=\"form-group\" id=\"main_chapterObjective" + (chapterObjectivesNum+1) + "Div\">" +
        "\n<label class=\"control-label col-lg-1\">" + (chapterObjectivesNum+1) + "</label>" +

        $('#chapterObjectiveDiv')[0].outerHTML +

        "\n<div class=\"col-lg-1\">" +
        "\n<button type=\"button\" class=\"btn btn-danger btn-circle\" onclick=\"removeNewChapterObjective()\">" +
        "\n<i class=\"icon-minus\"></i>" +
        "\n</button>" +
        "\n</div>" +

        "\n</div>";
    $("#main_chapterObjective" + (chapterObjectivesNum) + "Div").after(html);
    chapterObjectivesNum++;
};
var removeNewChapterObjective = function(){
    $("#main_chapterObjective" + (chapterObjectivesNum) + "Div").remove();
    chapterObjectivesNum--;

};

var addNewChapterPreRequisite = function(){
    var html =
        "\n<div class=\"form-group\" id=\"main_chapterPreRequisite" + (chapterPreRequisiteNum+1) + "Div\">" +
        "\n<label class=\"control-label col-lg-1\">" + (chapterPreRequisiteNum+1) + "</label>" +

        $('#chapterPreRequisiteNameDiv')[0].outerHTML +
        $('#chapterPreRequisiteURLDiv')[0].outerHTML +

        "\n<div class=\"col-lg-1\">" +
        "\n<button type=\"button\" class=\"btn btn-danger btn-circle\" onclick=\"removeNewChapterPreRequisite()\">" +
        "\n<i class=\"icon-minus\"></i>" +
        "\n</button>" +
        "\n</div>" +

        "\n</div>";
    $("#main_chapterPreRequisite" + (chapterPreRequisiteNum) + "Div").after(html);
    chapterPreRequisiteNum++;
};
var removeNewChapterPreRequisite = function(){
    $("#main_chapterPreRequisite" + (chapterPreRequisiteNum) + "Div").remove();
    chapterPreRequisiteNum--;

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


var checkChapterData = function(id) {
    $("#submitBtn").attr("disabled", "disabled");

    var isChapterFoundURL = "http://localhost:3002/chapter/" + id + "/isChapterFound";
    var RegExps = {
        names: /^[A-Za-z0-9 -\/]{5,70}$/,
        description: /^[A-Za-z0-9 -\/]{0,200}$/,
        numbers: /[0-9]+/,
        url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    };

    var inputIDs = {
        chapterName: '#chapterName',
        chapterPeriod: '#chapterPeriod',
        chapterObjective: '#chapterObjective',

        chapterPreRequisiteName: '#chapterPreRequisiteName',
        chapterPreRequisiteURL: '#chapterPreRequisiteURL'
    };

    $(document).change(function() {
        if($(inputIDs.chapterName).val() && $(inputIDs.chapterPeriod).val() && $(inputIDs.chapterObjective).val()){

            var isDisabled = true;

            if($(inputIDs.chapterPreRequisiteName).val() || $(inputIDs.chapterPreRequisiteURL).val())
                if($(inputIDs.chapterPreRequisiteName).val() && $(inputIDs.chapterPreRequisiteURL).val())
                    isDisabled = false;
                else
                    isDisabled = true;

            if(!isDisabled)
                $(inputIDs.submit).removeAttr("disabled");
        }
    });

    $(inputIDs.chapterName).change(function(){
        var chapterNameValue = $(inputIDs.chapterName).val();

        var mainDivID = '#main_chapterNameDiv';
        var spanID = 'chapterNameErrorSpan';

        $.ajax({
            type: "GET",
            url: isChapterFoundURL,
            data:{
                chapterName: chapterNameValue
            }, success: function(isFound){


                var passed = false;
                var errorMessage;

                if(chapterNameValue == '')
                    errorMessage = 'Please Enter Chapter name';
                else if(!RegExps.names.test(chapterNameValue))
                    errorMessage = 'Only English Letters, Numbers, Space, / and - are allowed';
                else if(chapterNameValue.length > 70 || chapterNameValue.length < 5)
                    errorMessage = 'Chapter name has to be from 5 to 70 Letters';
                else if(isFound)
                    errorMessage = 'This Chapter already Exists';
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
    $(inputIDs.chapterPeriod).change(function(){
        var chapterPeriodValue = $(inputIDs.chapterPeriod).val();

        var passed = false;
        var errorMessage;

        if(chapterPeriodValue == '')
            errorMessage = 'Please Enter the estimated Chapter Period';
        else if(!RegExps.numbers.test(chapterPeriodValue))
            errorMessage = 'Period has to be number only';
        else
            passed =  true;

        var mainDivID = '#main_chapterPeriodDiv';
        var spanID = 'chapterPeriodErrorSpan';

        if(!passed)
            showErrorMessage(mainDivID, spanID, errorMessage);
        else
            showSuccessMessage(mainDivID, spanID);
    });
    $(inputIDs.description).change(function(){
        var descriptionValue = $(inputIDs.description).val();

        var passed = false;
        var errorMessage;

        if(!RegExps.names.test(descriptionValue))
            errorMessage = 'Only English Letters, Numbers, Space, / and - are allowed';
        else if(descriptionValue.length > 200)
            errorMessage = 'The Chapter Description can\'t be more than 200 Letters';
        else
            passed =  true;

        var mainDivID = '#main_descriptionDiv';
        var spanID = 'descriptionErrorSpan';

        if(!passed)
            showErrorMessage(mainDivID, spanID, errorMessage);
        else
            showSuccessMessage(mainDivID, spanID);
    });
    $(inputIDs.chapterObjective).change(function(){
        var chapterObjectiveValue = $(inputIDs.chapterObjective).val();

        var passed = false;
        var errorMessage;

        if(chapterObjectiveValue.length == 0)
            errorMessage = 'Please Enter The Chapter Objective';
        else if(!RegExps.names.test(chapterObjectiveValue))
            errorMessage = 'Only English Letters, Numbers, Space, / and - are allowed';
        else if(chapterObjectiveValue.length > 70 || chapterObjectiveValue.length < 5)
            errorMessage = 'Chapter Objective has to be from 5 to 70 Letters';
        else
            passed =  true;

        var mainDivID = '#main_chapterObjectiveDiv';
        var spanID = 'chapterObjectiveErrorSpan';

        if(!passed)
            showErrorMessage(mainDivID, spanID, errorMessage);
        else
            showSuccessMessage(mainDivID, spanID);
    });
    $(inputIDs.chapterPreRequisiteName).change(function(){
        var chapterPreRequisiteNameValue = $(inputIDs.chapterPreRequisiteName).val();

        var passed = false;
        var errorMessage;

        if(!RegExps.names.test(chapterPreRequisiteNameValue))
            errorMessage = 'Only English Letters, Numbers, Space, / and - are allowed';
        else if(!$(inputIDs.chapterPreRequisiteName).val())
            errorMessage = 'Please Enter The Pre-Requisite URL';
        else if(chapterPreRequisiteNameValue.length > 70 || chapterPreRequisiteNameValue.length < 5)
            errorMessage = 'Pre-Requisite Name has to be from 5 to 70 Letters';
        else
            passed =  true;

        var mainDivID = '#main_chapterPreRequisiteNameDiv';
        var spanID = 'chapterPreRequisiteNameErrorSpan';

        if(!passed)
            showErrorMessage(mainDivID, spanID, errorMessage);
        else
            showSuccessMessage(mainDivID, spanID);
    });
    $(inputIDs.chapterPreRequisiteURL).change(function(){
        var chapterPreRequisiteURLValue = $(inputIDs.chapterPreRequisiteURL).val();

        var passed = false;
        var errorMessage;

        if(!RegExps.url.test(chapterPreRequisiteURLValue))
            errorMessage = 'Invalid URL';
        else if(!$(inputIDs.chapterPreRequisiteName).val())
            errorMessage = 'Please Enter The Pre-Requisite Name';
        else
            passed =  true;

        var mainDivID = '#main_chapterPreRequisiteURLDiv';
        var spanID = 'chapterPreRequisiteURLErrorSpan';

        if(!passed)
            showErrorMessage(mainDivID, spanID, errorMessage);
        else
            showSuccessMessage(mainDivID, spanID);
    });

};