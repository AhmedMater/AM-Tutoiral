/**
 * Created by Ahmed Mater on 12/24/2016.
 */

var DB = rootRequire('AM-Database');
var async = require('async');

var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');
var Generic = rootRequire('GenericRepository');
var Models = rootRequire('Models');

var COURSE_CONTENTS = "Course Contents";
var COURSE_CONTENT = "Course Content";
var DB_ERROR = SystemParam.DATABASE_ERROR;
var REPOSITORY = COURSE_CONTENTS + SystemParam.REPOSITORY;

var exports = module.exports = {};

/**
 * It's a Repository function responsible for inserting new records of the Course Contents in the Database
 * @param courseID Course ID of the contents
 * @param courseContentArray as Array of [num, content]
 * @param RepositoryCallback
 * @return Boolean - true if the records are inserted successfully <br/> - false if it failed to insert the records
 */
exports.insertCourseContents = function(courseContentArray, RepositoryCallback) {
    var fnName = "insertCourseContents";

    var query = 'INSERT INTO course_content SET ?';
    var attribute = 'prev_content_id';

    async.waterfall([function(GenericCallback){Generic.insertLinkedList(query, attribute, courseContentArray, REPOSITORY, fnName, COURSE_CONTENT, GenericCallback)}],
        function(err, lastContentID) {
        if (err != null)
            return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
        else
            return RepositoryCallback(null, lastContentID);

    });
};

/**
 * It's a Repository function responsible for retrieving all Course Contents by its ID from the Database
 * @param courseID Course ID of the contents
 * @param RepositoryCallback
 * @return CourseContent[] Array of Course Contents Objects
 */
exports.selectAllCourseContentsByID = function(courseID, RepositoryCallback){
    var fnName = "selectAllCourseContentsByID";

    var query = "SELECT num, content FROM course_content WHERE course_id = " + DB.escape(courseID);

    async.waterfall([
            function(GenericCallback){ Generic.selectAllRecords(query, REPOSITORY, fnName, COURSE_CONTENTS, GenericCallback); },
            function(data, ModelCallback){ Models.setAllContents(data, ModelCallback); }
        ], function(err, courseContents) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, courseContents);
        }
    );
};

/**
 * It's a Repository function responsible for Delete Course Content records from the Database
 * It's fully Deletion from the Database
 * @param courseID
 * @param RepositoryCallback
 * @return Boolean - true if Deleting Successfully Done <br/>
 *                  false if Deleting failed
 */
exports.deleteAllCourseContentsByID = function(courseID, RepositoryCallback){
    var fnName = "deleteAllCourseContentsByID";

    var query = "DELETE FROM course_content WHERE course_id = " + DB.escape(courseID);

    async.waterfall([
            function(GenericCallback){ Generic.deleteRecord(query, REPOSITORY, fnName, COURSE_CONTENTS, GenericCallback); }],
        function(err, done) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, done);
        }
    );
};

/**
 * It's a Repository function responsible for retrieving all the Contents of a Course by its ID from the Database
 * @param RepositoryCallback
 * @return CourseContent[] Array of Course Contents Objects
 */
exports.selectCourseContentByID_PrevID = function(courseID, prevContentID, RepositoryCallback){
    var fnName = "selectAllCourseContentsByID";

    var query = "SELECT id, prev_content_id, content FROM course_content " +
        "WHERE course_id = " + DB.escape(courseID) + " AND prev_content_id = " + DB.escape(prevContentID);

    async.waterfall([
            function(GenericCallback){ Generic.selectRecord(query, REPOSITORY, fnName, COURSE_CONTENTS, GenericCallback); },
            function(data, ModelCallback){ Models.setContent(data, ModelCallback); }
        ], function(err, courseContent) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, courseContent);
        }
    );
};

/**
 * It's a Repository function responsible for updating the Course Data in the Database
 * @param courseID ID of the Course to be updated
 * @param newCourseData new data to be updated as a JSON with columns are the keys
 * @param RepositoryCallback
 * @return Boolean true if Update succeeded <br/>
 *                false if Update failed
 */
exports.updateCourseContentByID_PrevID = function(contentID, newContentData, RepositoryCallback){
    var fnName = "updateCourseContentByID_PrevID";

    var attributes = {};

    if(newContentData.prevContentID != null) attributes['prev_content_id'] = newContentData.prevContentID;
    if(newContentData.content != null) attributes['content'] = newContentData.content;

    var query = "UPDATE course_content SET ? WHERE id = " + DB.escape(contentID);

    async.waterfall([ function(GenericCallback){Generic.updateRecord(query, attributes, REPOSITORY, fnName, COURSE_CONTENT, GenericCallback); }],
        function(err, done) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, done);
        }
    );
};

/**
 * It's a Repository function responsible for Delete Course Content records from the Database
 * It's fully Deletion from the Database
 * @param courseID
 * @param RepositoryCallback
 * @return Boolean - true if Deleting Successfully Done <br/>
 *                  false if Deleting failed
 */
exports.deleteCourseContentByID_Num = function(courseID, num, RepositoryCallback){
    var fnName = "deleteCourseContentByID_Num";

    var query = "DELETE FROM course_content WHERE num = " + DB.escape(num);

    async.waterfall([
            function(GenericCallback){ Generic.deleteRecord(query, REPOSITORY, fnName, COURSE_CONTENT, GenericCallback); }],
        function(err, done) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, done);
        }
    );
};

exports.insertCourseContent = function(courseID, prevContentID, content, nextContentID, RepositoryCallback){
    var fnName = 'insertCourseContent';
    var query = 'INSERT INTO course_content SET ?';

    var selectPrevContent = function(GenericCallback){
        exports.selectCourseContentByID_PrevID(courseID, prevContentID, GenericCallback);
    };
    var insertNewContent = function(courseContent, GenericCallback){
        var newCourseContent = {
            prev_content_id: courseContent.id,
            content: content,
            course_id: courseID
        };
        Generic.insertRecord(query, newCourseContent, REPOSITORY, fnName, COURSE_CONTENT, GenericCallback);
    };
    var updateNextContent = function(newCourseContentID, GenericCallback){
        exports.updateCourseContentByID_PrevID(nextContentID, {prevContentID: newCourseContentID},  GenericCallback);
    };

    async.waterfall([selectPrevContent, insertNewContent, updateNextContent],
        function(err, done) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, done);
        }
    );
};

