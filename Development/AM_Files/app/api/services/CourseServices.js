/**
 * Created by Ahmed Mater on 11/20/2016.
 */

var async = require('async');
var CourseRepository = rootRequire('CourseRepository');
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

    addNewCourse: function(courseData, RESTCallBack){
        var fnName = "addNewCourse";

        var isError = module.exports.addNewCourseValidation(courseData);

        if(isError != null)
            return RESTCallBack(isError, null);

        async.waterfall([
                function(RepositoryCallBack) {
                    CourseRepository.insertCourse(courseData, RepositoryCallBack);
                },
                function(done, RepositoryCallBack) {
                    if(done)
                        CourseRepository.getCourseID(courseData, RepositoryCallBack);
                }],
            function(err1, courseID) {
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

    isCourseFound: function(){

    },

    getAllCourses: function(){

    },

    getCourseByID: function(){

    },

    getCourseByName: function () {

    }
};