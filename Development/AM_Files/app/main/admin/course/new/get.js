/**
 * Created by Ahmed Mater on 10/9/2016.
 */
LookupServices = rootRequire('LookupServices');
var async = require('async');

module.exports = {
    go: function(req, res, next) {
        // We have to validate if the user is admin

        // We have to get all the lookup data from Database
        async.series([
            LookupServices.getAllCourseLevels,
            LookupServices.getAllCourseTypes,
            LookupServices.getAllReferenceTypes
        ], function (err, results) {

            res.render('newCourse', {
                title: "Add New Course",
                courseLevel: results[0],
                courseType: results[1],
                referenceType: results[2]
            });
        });

    }
};