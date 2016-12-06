/**
 * Created by Ahmed Mater on 12/4/2016.
 */

var async = require('async');
var ChapterServices = rootRequire('ChapterServices');

module.exports = {
    go: function(req, res, next) {

        var courseID = req.params.courseID;
        var chapterName = req.query.chapterName;

        async.series([
                function (RESTCallBack) {
                    ChapterServices.isChapterFound(chapterName, courseID, RESTCallBack);
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