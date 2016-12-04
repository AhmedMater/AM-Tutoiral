/**
 * Created by Ahmed Mater on 12/4/2016.
 */

var async = require('async');
var CourseServices = rootRequire('CourseServices');

module.exports = {
    go: function(req, res, next) {

        var courseName = req.query.courseName;
        var youTubePlaylist = req.query.youTubePlaylist;

        async.series([
                function (RESTCallBack) {
                    CourseServices.isCourseFound(courseName, youTubePlaylist, RESTCallBack);
                }],
            function (err, result) {
                if(err != null)
                    next(err);
                else
                    res.status(200).send(result);
            }
        );
    }
};