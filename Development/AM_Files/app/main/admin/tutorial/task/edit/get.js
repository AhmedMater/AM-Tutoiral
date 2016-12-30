/**
 * Created by Ahmed Mater on 10/9/2016.
 */
var async = require('async');

module.exports = {
    go: function(req, res, next) {
        async.series([ ], function (err, results) {

            res.render('addNewCourse', {
                title: "Add New Course"
            });
        });

    }
};