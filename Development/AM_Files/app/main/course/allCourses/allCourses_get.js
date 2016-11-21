/**
 * Created by Ahmed Mater on 10/9/2016.
 */
var exports = module.exports = {};
var config = require('../../../../configuration');

exports.go = function(req,res) {
    // we have to validate if the user is admin

    res.render(config.Views.allCourses, {
        title: "All Courses"
    });
};