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

            "\n<div class=\"col-lg-7\" id=\"courseObjectiveDiv\">" +
                "\n<input type=\"text\" id=\"courseObjective\" name=\"courseObjective\" placeholder=\"Enter the Course Objective\" class=\"form-control\" />" +
            "\n</div>" +

            "\n<div class=\"col-lg-1\">" +
                "\n<button type=\"button\" class=\"btn btn-danger btn-circle\" onclick=\"removeNewCourseObjective()\">" +
                    "\n<i class=\"icon-minus\"></i>" +
                "\n</button>" +
            "\n</div>" +

        "\n</div>";
    $("#main_courseObjective" + (courseObjectivesNum) + "Div").after(html);
    courseObjectivesNum++;
}
var removeNewCourseObjective = function(){
    $("#main_courseObjective" + (courseObjectivesNum) + "Div").remove();
    courseObjectivesNum--;

};

var addNewCourseContent = function(){
    var html =
        "\n<div class=\"form-group\" id=\"main_courseContent" + (courseContentNum+1) + "Div\">" +
            "\n<label class=\"control-label col-lg-1\">" + (courseContentNum+1) + "</label>" +

            "\n<div class=\"col-lg-7\" id=\"courseContentDiv\">" +
                "\n<input type=\"text\" id=\"courseContent\" name=\"courseContent\" placeholder=\"Enter the Course Content\" class=\"form-control\" />" +
            "\n</div>" +

            "\n<div class=\"col-lg-1\">" +
                "\n<button type=\"button\" class=\"btn btn-danger btn-circle\" onclick=\"removeNewCourseContent()\">" +
                    "\n<i class=\"icon-minus\"></i>" +
                "\n</button>" +
            "\n</div>" +

        "\n</div>";
    $("#main_courseContent" + (courseContentNum) + "Div").after(html);
    courseContentNum++;
}
var removeNewCourseContent = function(){
    $("#main_courseContent" + (courseContentNum) + "Div").remove();
    courseContentNum--;

};

var addNewCoursePreRequisite = function(){
    var html =
        "\n<div class=\"form-group\" id=\"main_coursePreRequisite" + (coursePreRequisiteNum+1) + "Div\">" +
            "\n<label class=\"control-label col-lg-1\">" + (coursePreRequisiteNum+1) + "</label>" +

            "\n<div class=\"col-lg-3\">" +
                "\n<input type=\"text\" class=\"form-control\" id=\"coursePreRequisiteName\" name=\"coursePreRequisiteName\" placeholder=\"Enter the Name\" />" +
            "\n</div>" +

            "\n<div class=\"col-lg-5\">" +
                "\n<input type=\"text\" class=\"form-control\" id=\"coursePreRequisiteURL\" name=\"coursePreRequisiteURL\" placeholder=\"Enter the URL\" />" +
            "\n</div>" +

            "\n<div class=\"col-lg-1\">" +
                "\n<button type=\"button\" class=\"btn btn-danger btn-circle\" onclick=\"removeNewCoursePreRequisite()\">" +
                    "\n<i class=\"icon-minus\"></i>" +
                "\n</button>" +
            "\n</div>" +

        "\n</div>";
    $("#main_coursePreRequisite" + (coursePreRequisiteNum) + "Div").after(html);
    coursePreRequisiteNum++;
}
var removeNewCoursePreRequisite = function(){
    $("#main_coursePreRequisite" + (coursePreRequisiteNum) + "Div").remove();
    coursePreRequisiteNum--;

};

var addNewCourseReference = function (){

    var referenceTypes = "";

    var types;
    for (type in referenceTypes)
        types += "\n<option value=\"" + type.value +"\">" + type.name +"</option>";

    var html =
        "\n<div class=\"form-group\" id=\"main_courseReference" + (courseReferenceNum+1) + "Div\">" +
            "\n<label class=\"control-label col-lg-1\">" + (courseReferenceNum+1) + "</label>" +

            "\n<div class=\"col-lg-3\" id=\"courseReferenceNameDiv\">" +
                "\n<input type=\"text\" class=\"form-control\"  id=\"courseReferenceName\" name=\"courseReferenceName\" placeholder=\"Enter the Name\" />" +
            "\n</div>" +

            "\n<div class=\"col-lg-2\" id=\"courseReferenceDiv\">" +
                "\n<select name=\"courseReferenceType\" placeholder=\"Type\" id=\"courseReferenceType\" class=\"form-control\">" +
                    "\n<option value=\"\" disabled selected>Type</option>" + types +
                "\n</select>" +
            "\n</div>" +

            "\n<div class=\"col-lg-4\" id=\"courseReferenceURLDiv\">" +
                "\n<input type=\"text\" class=\"form-control\"  id=\"courseReferenceURL\" name=\"courseReferenceURL\" placeholder=\"Enter the URL\" />" +
            "\n</div>" +

            "\n<div class=\"col-lg-1\">" +
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

var checkCourseData = function() {

};