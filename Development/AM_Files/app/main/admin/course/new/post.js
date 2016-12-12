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
        //var preRequisite = {
        //    name: req.body.coursePreRequisiteName,
        //    URL: req.body.coursePreRequisiteURL
        //};
        //var reference = {
        //    name: req.body.courseReferenceName,
        //    typeID: req.body.courseReferenceTypeID,
        //    URL: req.body.courseReferenceURL
        //};
        //
        //var coursePreRequisites = [];
        //if(preRequisite.name && preRequisite.URL) {
        //
        //    // Validate if all fields are full
        //    if(preRequisite.name.length != preRequisite.URL.length){
        //        Logger.error(SystemParam.MAIN, fnName, ErrMsg.ERROR_14);
        //        next(ErrMsg.createError(SystemParam.FRONTEND_ERROR, 500, ErrMsg.ERROR_14), null);
        //    }
        //
        //    for (var i = 0; i < preRequisite.name.length; i++)
        //        coursePreRequisites.push({
        //            name: preRequisite.name[i],
        //            URL: preRequisite.URL[i]
        //        });
        //}
        //
        //var courseReferences = [];
        //if(reference.name && reference.typeID && reference.URL) {
        //
        //    // Validate if all fields are full
        //    if((reference.name.length != reference.typeID.length) && (reference.name.length != reference.URL.length)){
        //        Logger.error(SystemParam.MAIN, fnName, ErrMsg.ERROR_15);
        //        next(ErrMsg.createError(SystemParam.FRONTEND_ERROR, 500, ErrMsg.ERROR_15), null);
        //    }
        //
        //    for (var i = 0; i < reference.name.length; i++)
        //        courseReferences.push({
        //            name: reference.name[i],
        //            typeID: reference.typeID[i],
        //            URL: reference.URL[i]
        //        });
        //}
        //
        //var courseData = {
        //    courseName: (req.body.courseName) ? req.body.courseName : null,
        //    coursePeriod: (req.body.coursePeriod) ? req.body.coursePeriod : null,
        //    courseLevelID: (req.body.courseLevelID) ? req.body.courseLevelID : null,
        //    courseTypeID: (req.body.courseTypeID) ? req.body.courseTypeID : null,
        //    youTubePlaylist: (req.body.youTubePlaylist) ? req.body.youTubePlaylist : null,
        //    courseDescription: (req.body.courseDescription) ? req.body.courseDescription : null,
        //    courseContents: (req.body.courseContent) ? req.body.courseContent : null,
        //    courseObjectives: (req.body.courseObjectives) ? req.body.courseObjectives : null,
        //    coursePreRequisites: coursePreRequisites,
        //    courseReferences: courseReferences
        //};

        // For Testing
        var courseData = {
            courseName: "Operating System I",
            coursePeriod: 30,
            courseLevelID: 1,
            courseTypeID: 2,
            youTubePlaylist: "https://www.youtube.com/playlist?list=PLqItuIAASZlNc3tcI7-a7VupWm1h2nEXl",
            courseDescription: "It's a new Course for teaching the Basics and Principles for the Operating Systems",
            courseContents: ['Content 1' , 'Content 2' , 'Content 3' , 'Content 4' , 'Content 5'],
            courseObjectives: ['Objective 1' , 'Objective 2' , 'Objective 3'],
            coursePreRequisites: [
                {name: "Java Programming SE", URL: "https://www.youtube.com/watch?v=LCSD8XKKNN0"},
                {name: "Computer Organization", URL: "https://www.youtube.com/watch?v=J09uZAR4dXg"},
                {name: "Oracle DB Course", URL: "https://www.youtube.com/playlist?list=PLqItuIAASZlMBrvsen4NXFQKkkdLn3Mmx"}
            ],
            courseReferences: [
                { name: "Ref Name 1", typeID: "1", URL: "https://www.amazon.com/Java-Complete-Reference-Herbert-Schildt/dp/0071808558"},
                { name: "Ref Name 2", typeID: "2", URL: "https://www.youtube.com/watch?v=DaX5ml3XPso"},
                { name: "Ref Name 3", typeID: "3", URL: "https://www.amazon.com/C-Programming-Language-4th/dp/0321563840"},
                { name: "Ref Name 4", typeID: "4", URL: "https://www.amazon.com/Programming-Principles-Practice-Using-2nd/dp/0321992784"},
                { name: "Ref Name 5", typeID: "5", URL: "https://www.youtube.com/watch?v=IcYZOizikwA&list=RDIcYZOizikwA"},
                { name: "Ref Name 6", typeID: "6", URL: "http://www.wrox.com/WileyCDA/WroxTitle/Professional-C-6-and-NET-Core-1-0.productCd-111909660X.html"}
            ]
        };

        // Get the User From the Session
        var userID = null;
        if(req.session.user != null){
            if(req.session.user.isAdmin)
                userID = req.session.user.userID;
            else
                res.render('unAuthorized',{
                    title: "Access Denied",
                    baseURL: req.originalUrl
                });

        } else
            res.redirect(config.URL.login);

        async.waterfall([
                function(RESTCallBack) {
                    CourseServices.addNewCourse(courseData, userID, RESTCallBack);
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
