/**
 * Created by Ahmed Mater on 12/4/2016.
 */

var async = require('async');
var CourseServices = rootRequire('CourseServices');

module.exports = {
    go: function(req, res, next) {

        var courseName = (req.query.courseName) ? req.query.courseName : null;
        var youTubePlaylist = (req.query.youTubePlaylist) ? req.query.youTubePlaylist : null;

        async.series([
                function (RESTCallBack) {
                    CourseServices.isCourseFound(courseName, youTubePlaylist, RESTCallBack);
                }],
            function (err, results) {
                if(err != null)
                    res.status(400).send(err.message);
                else
                    res.status(200).send(results[0]);
            }
        );
    }
};