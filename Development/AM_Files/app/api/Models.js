/**
 * Created by Ahmed Mater on 12/24/2016.
 */
var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');

var MODEL_ERROR = SystemParam.MODEL_ERROR;
var MODELS = 'Models';

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
                userRole: rows[i].roleName,
                fullName: rows[i].fullName,
                dateOfRegistration: rows[i].date_of_registration,
                gender: (rows[i].gender == 'M') ? 'Male' : 'Female',
                university: rows[i].university,
                college: rows[i].college,
                job: rows[i].job,
                country: rows[i].country,
                dateOfBirth: rows[i].date_of_birth
            });

        return ModelCallback(null, Users);
    }
};

exports.setCourse = function(row, ModelCallback){
    if(row == null)
        return ModelCallback(null, null);
    else {
        var Course = {
            name: row.courseName,
            period: row.period,
            level: row.courseLevel,
            type: row.courseType,
            dateOfCourse: row.date_of_course,
            lastUpdated: row.last_updated,
            youTubePlaylist: row.playlist_link,
            description: row.description,
            addBy: row.fullName
        };

        return ModelCallback(null, Course);
    }
};
exports.setAllCourses = function(rows, ModelCallback){
    if(rows == null)
        return ModelCallback(null, null);
    else {
        var Courses = [];

        for(var i=0; i<rows.length; i++)
            Courses.push({
                name: rows[i].courseName,
                period: rows[i].period,
                level: rows[i].courseLevel,
                type: rows[i].courseType,
                dateOfCourse: rows[i].date_of_course,
                lastUpdated: rows[i].last_updated,
                youTubePlaylist: rows[i].playlist_link,
                description: rows[i].description
            });

        return ModelCallback(null, Courses);
    }
};

exports.setCourseContent = function(row, ModelCallback){
    if(row == null)
        return ModelCallback(null, null);
    else {
        var CourseContent = {
            id: row.id,
            prevID: row.prev_content_id,
            content: row.content,
            courseID: row.course_id
        };

        return ModelCallback(null, CourseContent);
    }
};

exports.setAllCourseContents = function(rows, ModelCallback){
    if(rows == null)
        return ModelCallback(null, null);
    else {
        var CourseContents = [];

        for(var i=0; i<rows.length; i++)
            CourseContents.push({
                id: rows[i].id,
                prevID: rows[i].prev_content_id,
                content: rows[i].content,
                courseID: rows[i].course_id
            });

        return ModelCallback(null, CourseContents);
    }
};
exports.setAllObjectives = function(rows, ModelCallback){
    if(rows == null)
        return ModelCallback(null, null);
    else {
        var CourseObjectives = [];

        for(var i=0; i<rows.length; i++)
            CourseObjectives.push({
                num: rows[i].num,
                objective: rows[i].objective
            });

        return ModelCallback(null, CourseObjectives);
    }
};
exports.setAllPrerequisites = function(rows, ModelCallback){
    if(rows == null)
        return ModelCallback(null, null);
    else {
        var CourseObjectives = [];

        for(var i=0; i<rows.length; i++)
            CourseObjectives.push({
                name: rows[i].name,
                url: rows[i].url
            });

        return ModelCallback(null, CourseObjectives);
    }
};
exports.setAllReferences = function(rows, ModelCallback){
    if(rows == null)
        return ModelCallback(null, null);
    else {
        var CourseReferences = [];

        for(var i=0; i<rows.length; i++)
            CourseReferences.push({
                name: rows[i].name,
                type: rows[i].typeName,
                url: rows[i].url
            });

        return ModelCallback(null, CourseReferences);
    }
};

exports.orderLinkedListArray = function(linkedListArray, ModelCallback){
    var fnName = 'orderLinkedListArray';
    var orderedArray = [];

    // If the Array to be ordered is empty
    if(linkedListArray.length == 0) {
        Logger.debug(MODELS, fnName, "No Elements to be ordered");
        return ModelCallback(null, null);
    }

    // Get the first element
    for(var i=0; i<linkedListArray.length; i++)
        if(linkedListArray[i].prevID == 0) {
            orderedArray.push(linkedListArray[i]);
            linkedListArray.splice(i, 1);
            break;
        }

    // If It failes to find the first element
    if(orderedArray.length == 0) {
        Logger.error(MODELS, fnName, "Can't find the first Element");
        return ModelCallback(ErrMsg.createError(MODEL_ERROR, "Can't find the first Element"), null);
    }

    // Order the linked List elements
    for(var i=0; i<linkedListArray.length; i++)
        if(linkedListArray[i].prevID == orderedArray[orderedArray.length-1].id) {
            orderedArray.push(linkedListArray[i]);
            linkedListArray.splice(i, 1);
            i=-1;
        }

    // if the Array isn't fully ordered
    if(linkedListArray.length == 0) {
        Logger.error(MODELS, fnName, "Still some elements not Ordered");
        return ModelCallback(ErrMsg.createError(MODEL_ERROR, "Still some elements not Ordered"), null);
    }else{
        Logger.debug(MODELS, fnName, "Array is Ordered Successfully");
        ModelCallback(null, orderedArray);
    }
};