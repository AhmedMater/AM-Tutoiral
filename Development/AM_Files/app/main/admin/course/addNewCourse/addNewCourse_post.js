/**
 * Created by Ahmed Mater on 10/9/2016.
 */
var exports = module.exports = {};
var config = require('../../../../configuration');

exports.go = function(req,res) {
    // we have to validate if the user is admin

    console.log(req.body);
    res.render(config.Views.addNewCourse, {
        title: "Add New Course"
    });
};