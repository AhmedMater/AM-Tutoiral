/**
 * Created by Ahmed Mater on 11/20/2016.
 */

var async = require('async');
var CourseRepository = rootRequire('CourseRepository');
var UserServices = rootRequire('UserServices');
var LookupServices = rootRequire('LookupServices');

var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');

module.exports = {
    addNewCourseValidation: function(courseData){
        var fnName = "addNewCourseValidation";
        var RegExp = SystemParam.RegularExpression;
        var ErrorMessage = null;

        if(courseData.courseName == null || courseData.coursePeriod == null || courseData.courseType == null ||
            courseData.courseLevel == null || courseData.youTubePlayList == null || courseData.courseContents == null ||
            courseData.courseObjectives == null || courseData.courseReferences) {
            Logger.error(SystemParam.SERVICES, fnName, ErrMsg.ERROR_1);
            return ErrMsg.createError(SystemParam.SERVER_ERROR, 400, ErrMsg.ERROR_1);
        }
        else if(!RegExp.userName.test(userData.userName)) {
            Logger.error(SystemParam.SERVICES, fnName, ErrMsg.ERROR_2);
            return ErrMsg.createError(SystemParam.SERVER_ERROR, 400, ErrMsg.ERROR_2);
        }
    },

    addNewCourse: function(courseData, userID, RESTCallBack){
        var fnName = "addNewCourse";

        if(userID == null)
            return RESTCallBack

        var isError = module.exports.addNewCourseValidation(courseData);

        if(isError != null)
            return RESTCallBack(isError, null);

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
        }

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
    },

    isCourseFound: function(courseName, youTubePlaylist, RESTCallBack){
        var fnName = "isCourseFound";

        if(courseName == null && youTubePlaylist == null) {
            Logger.error(SystemParam.SERVICES, fnName, 'Course Name and Youtube Playlist are Missing');
            return RESTCallBack(ErrMsg.createError(SystemParam.SERVER_ERROR, 400, 'Course Name and Youtube Playlist are Missing'), null);
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
    },

    getAllCourses: function(){

    },

    getCourseByID: function(){

    },

    getCourseByName: function () {

    }
};