/**
 * Created by Ahmed Mater on 10/9/2016.
 */
var exports = module.exports = {};
var config = require('../../../../configuration');
var lookupService = require('../../../' + config.Services.Lookup);

exports.go = function(req,res) {
    // we have to validate if the user is admin

    res.render(config.Views.addNewCourse, {
        title: "Add New Course",
        courseLevel: lookupService.getAllCourseLevels(),
        courseType: lookupService.getAllCourseTypes(),
        referenceType:lookupService.getAllReferenceTypes()
    });
};
