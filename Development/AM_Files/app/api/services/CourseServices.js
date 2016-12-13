/**
 * Created by Ahmed Mater on 11/20/2016.
 */

var async = require('async');
var CourseRepository = rootRequire('CourseRepository');
var UserServices = rootRequire('UserServices');
var LookupServices = rootRequire('LookupServices');

var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Valid = rootRequire('Validation');
var Logger = rootRequire('Logger');


var newCourseValid = function(courseData){
    var errMsg = null;

    errMsg = Valid.title(courseData.courseName, "Course Name");
    if(errMsg != null)
        return errMsg;

    errMsg = Valid.positiveNum(courseData.coursePeriod, "Course Period");
    if(errMsg != null)
        return errMsg;

    errMsg = Valid.positiveNum(courseData.courseLevelID, "Course Level");
    if(errMsg != null)
        return errMsg;

    errMsg = Valid.positiveNum(courseData.courseTypeID, "Course Type");
    if(errMsg != null)
        return errMsg;

    errMsg = Valid.youTubePlayList(courseData.youTubePlayList, "Course Youtube Playlist");
    if(errMsg != null)
        return errMsg;

    errMsg = Valid.description(courseData.description, "Course Description");
    if(errMsg != null)
        return errMsg;

    if(courseData.courseContents == null || courseData.courseContents == [])
        return ErrMsg.MANDATORY_NULL_FIELD("Course Contents");
    else
        for(var i=0; i<courseData.courseContents.length; i++){
            errMsg = Valid.title(courseData.courseContents[i], "Course Content");
            if(errMsg != null)
                return errMsg;
        }

    if(courseData.courseObjectives == null || courseData.courseObjectives == [])
        return ErrMsg.MANDATORY_NULL_FIELD("Course Objectives");
    else
        for(var i=0; i<courseData.courseObjectives.length; i++){
            errMsg = Valid.title(courseData.courseObjectives[i], "Course Objectives");
            if(errMsg != null)
                return errMsg;
        }

    if(courseData.coursePreRequisites != null && courseData.coursePreRequisites != []) {
        for (var i = 0; i < courseData.coursePreRequisites.length; i++) {
            errMsg = Valid.title(courseData.coursePreRequisites[i].name, "Course Prerequisites Name");
            if (errMsg != null)
                return errMsg;

            errMsg = Valid.url(courseData.coursePreRequisites[i].URL, "Course Prerequisites URL");
            if (errMsg != null)
                return errMsg;
        }
    }

    if(courseData.courseReferences == null || courseData.courseReferences == [])
        return ErrMsg.MANDATORY_NULL_FIELD("Course References");
    else
        for(var i=0; i<courseData.courseReferences.length; i++) {

            errMsg = Valid.title(courseData.courseReferences[i].name, "Course References Name");
            if (errMsg != null)
                return errMsg;

            errMsg = Valid.positiveNum(courseData.courseReferences[i].typeID, "Course References Type");
            if (errMsg != null)
                return errMsg;

            errMsg = Valid.url(courseData.courseReferences[i].URL, "Course References URL");
            if (errMsg != null)
                return errMsg;
        }
    return null;
};

var exports = module.exports = {};

exports.addNewCourse = function(courseData, userID, RESTCallBack){
    var fnName = "addNewCourse";

    if(userID == null)
        return RESTCallBack(ErrMsg.createError(SystemParam.SERVER_ERROR, ErrMsg.MANDATORY_NULL_FIELD("User ID")));

    var errMsg = newCourseValid(courseData);

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
    };
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
        errMsg = ErrMsg.MANDATORY_NULL_FIELD('Course Name and Youtube Playlist');
    else if(courseName != null) {
        if (youTubePlaylist != null){
            errMsg = Valid.youTubePlayList(youTubePlaylist, "Course Youtube Playlist");
            errMsg = Valid.name(courseName, "Course Name");
        }else
            errMsg = Valid.name(courseName, "Course Name");

    }else if(youTubePlaylist != null) {
        if (courseName != null){
            errMsg = Valid.name(courseName, "Course Name");
            errMsg = Valid.youTubePlayList(youTubePlaylist, "Course Youtube Playlist");
        }else
            errMsg = Valid.youTubePlayList(youTubePlaylist, "Course Youtube Playlist");
    }

    if(errMsg != null){
        Logger.error(SystemParam.SERVICES, fnName, ErrMsg.MANDATORY_NULL_FIELD('Course Name and Youtube Playlist'));
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