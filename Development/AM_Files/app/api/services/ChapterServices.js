/**
 * Created by ahmed.motair on 12/1/2016.
 */

var async = require('async');

var ChapterRepository = rootRequire('ChapterRepository');
var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');

module.exports = {

    addNewChapter: function(chapterData, RESTCallBack){

    },

    isChapterFound: function(chapterName, courseID, RESTCallBack){
        var fnName = "isChapterFound";

        if(chapterName == null && courseID == null) {
            Logger.error(SystemParam.SERVICES, fnName, 'Chapter Name and Course ID are Missing');
            return RESTCallBack(ErrMsg.createError(SystemParam.SERVER_ERROR, 400, 'Chapter Name and Course ID are Missing'), null);
        }

        async.waterfall([
                function(RepositoryCallBack) {
                    ChapterRepository.isChapterFound(chapterName, courseID, RepositoryCallBack);
                }],
            function(err, result) {
                if(err != null)
                    Logger.error(SystemParam.SERVICES, fnName, err.message);

                RESTCallBack(err, result);
            }
        );
    }
};