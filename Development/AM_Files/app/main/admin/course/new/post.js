/**
 * Created by Ahmed Mater on 10/9/2016.
 */

var config = rootRequire('configuration');
var async = require('async');
var CourseServices = rootRequire('CourseServices');

var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');

module.exports = {
    go: function (req, res, next) {
        var fnName = "newCourse_get";

        var coursePreRequisites = [];
        if(req.body.coursePreRequisiteName && req.body.coursePreRequisiteURL) {

            // Validate if all fields are full
            if(req.body.coursePreRequisiteName.length != req.body.coursePreRequisiteURL.length){
                Logger.error(SystemParam.MAIN, fnName, ErrMsg.ERROR_14);
                next(ErrMsg.createError(SystemParam.FRONTEND_ERROR, 500, ErrMsg.ERROR_14), null);
            }

            for (var i = 0; i < coursePreRequisiteName.length; i++)
                coursePreRequisites.push({
                    name: req.body.coursePreRequisiteName[i],
                    URL: req.body.coursePreRequisiteURL[i]
                });
        }

        var courseReferences = [];
        if(req.body.courseReferenceName && req.body.courseReferenceTypeID && req.body.courseReferenceURL) {

            // Validate if all fields are full
            if((req.body.courseReferenceName.length != req.body.courseReferenceTypeID.length) &&
                (req.body.courseReferenceName.length != req.body.courseReferenceURL.length)){
                Logger.error(SystemParam.MAIN, fnName, ErrMsg.ERROR_15);
                next(ErrMsg.createError(SystemParam.FRONTEND_ERROR, 500, ErrMsg.ERROR_15), null);
            }

            for (var i = 0; i < courseReferenceName.length; i++)
                courseReferences.push({
                    name: req.body.courseReferenceName[i],
                    typeID: req.body.courseReferenceTypeID[i],
                    URL: req.body.courseReferenceURL[i]
                });
        }

        var courseData = {
            courseName: (req.body.courseName) ? req.body.courseName : null,
            coursePeriod: (req.body.coursePeriod) ? req.body.coursePeriod : null,
            courseLevelID: (req.body.courseLevelID) ? req.body.courseLevelID : null,
            courseTypeID: (req.body.courseTypeID) ? req.body.courseTypeID : null,
            youTubePlaylist: (req.body.youTubePlaylist) ? req.body.youTubePlaylist : null,
            courseDescription: (req.body.courseDescription) ? req.body.courseDescription : null,
            courseContents: (req.body.courseContent) ? req.body.courseContent : null,
            courseObjectives: (req.body.courseObjectives) ? req.body.courseObjectives : null,
            coursePreRequisites: coursePreRequisites,
            courseReferences: courseReferences
        };


        async.waterfall([
                function(RESTCallBack) {
                    CourseServices.addNewCourse(courseData, RESTCallBack);
                }],
            function(err, result) {
                if(err != null)
                    next(err);
                else
                    res.render('newCourse_success', {
                        title: 'Add New Course'
                    });
            }
        );


    }
};
