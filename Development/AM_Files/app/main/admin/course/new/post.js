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
        var preRequisite = {
            name: req.body.coursePreRequisiteName,
            URL: req.body.coursePreRequisiteURL
        };
        var reference = {
            name: req.body.courseReferenceName,
            typeID: req.body.courseReferenceTypeID,
            URL: req.body.courseReferenceURL
        };

        var coursePreRequisites = [];
        if(preRequisite.name && preRequisite.URL) {

            // Validate if all fields are full
            if(preRequisite.name.length != preRequisite.URL.length){
                Logger.error(SystemParam.MAIN, fnName, ErrMsg.ERROR_14);
                next(ErrMsg.createError(SystemParam.FRONTEND_ERROR, 500, ErrMsg.ERROR_14), null);
            }

            for (var i = 0; i < preRequisite.name.length; i++)
                coursePreRequisites.push({
                    name: preRequisite.name[i],
                    URL: preRequisite.URL[i]
                });
        }

        var courseReferences = [];
        if(reference.name && reference.typeID && reference.URL) {

            // Validate if all fields are full
            if((reference.name.length != reference.typeID.length) && (reference.name.length != reference.URL.length)){
                Logger.error(SystemParam.MAIN, fnName, ErrMsg.ERROR_15);
                next(ErrMsg.createError(SystemParam.FRONTEND_ERROR, 500, ErrMsg.ERROR_15), null);
            }

            for (var i = 0; i < reference.name.length; i++)
                courseReferences.push({
                    name: reference.name[i],
                    typeID: reference.typeID[i],
                    URL: reference.URL[i]
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
