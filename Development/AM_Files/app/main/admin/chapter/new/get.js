/**
 * Created by Ahmed Mater on 10/9/2016.
 */
LookupServices = rootRequire('LookupServices');
var async = require('async');

module.exports = {
    go: function(req, res, next) {

        res.render('newChapter', {
            title: "Add New Chapter",
            courseID: req.params.courseID
        });

    }
};