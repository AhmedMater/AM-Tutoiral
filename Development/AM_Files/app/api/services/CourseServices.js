/**
 * Created by Ahmed Mater on 11/20/2016.
 */

var async = require('async');
var CourseRepository = rootRequire('CourseRepository');
var UserServices = rootRequire('UserServices');
var LookupServices = rootRequire('LookupServices');

var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Validation = rootRequire('Validation');
var Logger = rootRequire('Logger');


var newCourseValidation = function(courseData){
    var RegExp = SystemParam.RegularExpression;
    var errMsg = null;

    errMsg = Validation.name(courseData.courseName, "Course Name");
    if(errMsg != null)
        return errMsg;

    errMsg = Validation.positiveNum(courseData.coursePeriod, "Course Period");
    if(errMsg != null)
        return errMsg;

    errMsg = Validation.positiveNum(courseData.courseLevelID, "Course Level");
    if(errMsg != null)
        return errMsg;

    errMsg = Validation.positiveNum(courseData.courseTypeID, "Course Type");
    if(errMsg != null)
        return errMsg;

    errMsg = Validation.youTubePlayList(courseData.youTubePlayList, "Course Youtube Playlist");
    if(errMsg != null)
        return errMsg;

    if(!RegExp.description.test(courseData.description))
        return ErrMsg.error_2_InvalidData("Course Description");

    if(courseData.courseContents == null || courseData.courseContents == [])
        return ErrMsg.error_1_MandatoryFieldMissing("Course Contents");
    else
        for(var i=0; i<courseData.courseContents.length; i++){
            errMsg = Validation.name(courseData.courseContents[i], "Course Content");
            if(errMsg != null)
                return errMsg;
        }

    if(courseData.courseObjectives == null || courseData.courseObjectives == [])
        return ErrMsg.error_1_MandatoryFieldMissing("Course Objectives");
    else
        for(var i=0; i<courseData.courseObjectives.length; i++){
            errMsg = Validation.name(courseData.courseObjectives[i], "Course Objectives");
            if(errMsg != null)
                return errMsg;
        }

    if(courseData.coursePreRequisites != null && courseData.coursePreRequisites != []) {
        for (var i = 0; i < courseData.coursePreRequisites.length; i++) {
            errMsg = Validation.name(courseData.coursePreRequisites[i].name, "Course Prerequisites Name");
            if (errMsg != null)
                return errMsg;

            errMsg = Validation.url(courseData.coursePreRequisites[i].URL, "Course Prerequisites URL");
            if (errMsg != null)
                return errMsg;
        }
    }

    if(courseData.courseReferences == null || courseData.courseReferences == [])
        return ErrMsg.error_1_MandatoryFieldMissing("Course References");
    else
        for(var i=0; i<courseData.courseReferences.length; i++) {

            errMsg = Validation.name(courseData.courseReferences[i].name, "Course References Name");
            if (errMsg != null)
                return errMsg;

            errMsg = Validation.positiveNum(courseData.courseReferences[i].typeID, "Course References Type");
            if (errMsg != null)
                return errMsg;

            errMsg = Validation.url(courseData.courseReferences[i].URL, "Course References URL");
            if (errMsg != null)
                return errMsg;
        }
    return null;
};

var exports = module.exports = {};

exports.addNewCourse = function(courseData, userID, RESTCallBack){
    var fnName = "addNewCourse";

    if(userID == null)
        return RESTCallBack(ErrMsg.createError(SystemParam.SERVER_ERROR, ErrMsg.error_1_MandatoryFieldMissing("User ID")));

    var errMsg = newCourseValidation(courseData);

    if(errMsg != null)
        return RESTCallBack(ErrMsg.createError(SystemParam.SERVER_ERROR, 400, errMsg), null);

    // testing if the Course Playlist found
    // testing if the Course already found
    // testing if the Course Level ID is valid
    // testing if the Course Type ID is valid

    var isUserAdmin = function(ServiceCallBack){
        UserServices.isUserAdmin(userID, ServiceCallBack);
    };
    var addMainCourseInfo = function(isAdmin, RepositoryCallBack) {
        if(isAdmin)
            CourseRepository.insertCourse(courseData, RepositoryCallBack);
        else
            return RepositoryCallBack(ErrMsg.createError(SystemParam.SERVER_ERROR, 400, 'Only Admin Users can add Courses'), null);
    };
    var getCourseID =function(done, RepositoryCallBack) {
        if(done)
            CourseRepository.getCourseID(courseData, RepositoryCallBack);
    };;

    async.waterfall([ isUserAdmin, addMainCourseInfo, getCourseID ],function(err1, courseID) {
            if(err1 != null) {
                Logger.error(SystemParam.SERVICES, fnName, err1.message);
                return RESTCallBack(ErrMsg.createError(SystemParam.SERVER_ERROR, 400, err1.message), null);
            }

            var courseContentArray = [];
            for(var i= 0; i<courseData.courseContents.length; i++)
                courseContentArray.push([courseID, (i + 1), courseData.courseContents[i]]);

            var courseObjectivesArray = [];
            for(var i= 0; i<courseData.courseObjectives.length; i++)
                courseObjectivesArray.push([courseID, (i + 1), courseData.courseObjectives[i]]);

            var coursePreRequisitesArray = [];
            for(var i= 0; i<courseData.coursePreRequisites.length; i++) {
                var name =courseData.coursePreRequisites[i].name;
                var URL = courseData.coursePreRequisites[i].URL;

                coursePreRequisitesArray.push([courseID, name, URL]);
            }

            var courseReferencesArray = [];
            for(var i= 0; i<courseData.courseReferences.length; i++) {

                var name = courseData.courseReferences[i].name;
                var typeID = courseData.courseReferences[i].typeID;
                var URL = courseData.courseReferences[i].URL;

                courseReferencesArray.push([courseID, name, typeID, URL]);
            }

            async.series([
                CourseRepository.insertCourseContents(courseContentArray),
                CourseRepository.insertCourseObjectives(courseObjectivesArray),
                CourseRepository.insertCoursePreRequisites(coursePreRequisitesArray),
                CourseRepository.insertCourseReferences(courseReferencesArray)
            ], function (err2, results) {
                if(err2 != null)
                    Logger.error(SystemParam.SERVICES, fnName, err2.message);

                RESTCallBack(err2, true);
            });
        }
    );
};

exports.isCourseFound = function(courseName, youTubePlaylist, RESTCallBack){
    var fnName = "isCourseFound";
    var errMsg = null;

    if(courseName == null && youTubePlaylist)
        errMsg = ErrMsg.error_1_MandatoryFieldMissing('Course Name and Youtube Playlist');
    else if(courseName != null) {
        if (youTubePlaylist != null){
            errMsg = Validation.youTubePlayList(youTubePlaylist, "Course Youtube Playlist");
            errMsg = Validation.name(courseName, "Course Name");
        }else
            errMsg = Validation.name(courseName, "Course Name");

    }else if(youTubePlaylist != null) {
        if (courseName != null){
            errMsg = Validation.name(courseName, "Course Name");
            errMsg = Validation.youTubePlayList(youTubePlaylist, "Course Youtube Playlist");
        }else
            errMsg = Validation.youTubePlayList(youTubePlaylist, "Course Youtube Playlist");
    }

    if(errMsg != null){
        Logger.error(SystemParam.SERVICES, fnName, ErrMsg.error_1_MandatoryFieldMissing('Course Name and Youtube Playlist'));
        return RESTCallBack(ErrMsg.createError(SystemParam.SERVER_ERROR, 400, errMsg), null);
    }

    async.waterfall([
            function(RepositoryCallBack){
                CourseRepository.isCourseFound(courseName, youTubePlaylist, RepositoryCallBack);
            }],
        function(err, isFound) {
            if(err != null)
                Logger.error(SystemParam.SERVICES, fnName, err.message);

            RESTCallBack(err, isFound);
        }
    );
};

exports.getAllCourses = function(){

};

exports.getCourseByID = function(){

};

exports.getCourseByName = function () {

};