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

var queries = {
    insertCourseContent: 'INSERT INTO course_content SET ?',
    deleteCourseContent: function(contentID){ return "DELETE FROM course_content WHERE id = " + DB.escape(contentID);},
    updateCourseContent: function(contentID){ return "UPDATE course_content SET ? WHERE id = " + DB.escape(contentID);}
};

/**
 * It's a Repository function responsible for inserting new records of the Course Contents in the Database
 * @param courseContentArray as Array of [prevID, content, courseID]
 * @param RepositoryCallback
 * @return Boolean - true if the records are inserted successfully <br/> - false if it failed to insert the records
 */
exports.insertAllCourseContents = function(courseContentArray, RepositoryCallback) {
    var fnName = "insertAllCourseContents";

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
exports.selectAllCourseContents = function(courseID, RepositoryCallback){
    var fnName = "selectAllCourseContents";

    var query = "SELECT id, prev_content_id, content, course_id FROM course_content " +
        "WHERE course_id = " + DB.escape(courseID);

    async.waterfall([
            function(GenericCallback){ Generic.selectAllRecords(query, REPOSITORY, fnName, COURSE_CONTENTS, GenericCallback); },
            function(data, ModelCallback){ Models.setAllCourseContents(data, ModelCallback); },
            function(courseContentArray, ModelCallback){ Models.orderLinkedListArray(courseContentArray, ModelCallback); }
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
exports.deleteAllCourseContents = function(courseID, RepositoryCallback){
    var fnName = "deleteAllCourseContents";

    var query = "DELETE FROM course_content WHERE course_id = " + DB.escape(courseID);

    async.waterfall([
            function(GenericCallback){ Generic.deleteRecords(query, true, REPOSITORY, fnName, COURSE_CONTENTS, GenericCallback); }],
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
exports.selectCourseContentByID = function(contentID, RepositoryCallback){
    var fnName = "selectCourseContentByID";

    var query = "SELECT id, prev_content_id, content, course_id FROM course_content " +
        "WHERE id = " + DB.escape(contentID);

    async.waterfall([
            function(GenericCallback){ Generic.selectRecord(query, REPOSITORY, fnName, COURSE_CONTENTS, GenericCallback); },
            function(data, ModelCallback){ Models.setCourseContent(data, ModelCallback); }
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
exports.updateCourseContentByID = function(contentID, newContentData, RepositoryCallback){
    var fnName = "updateCourseContentByID";

    var attributes = {};

    if(newContentData.prevID != null) attributes['prev_content_id'] = newContentData.prevID;
    if(newContentData.content != null) attributes['content'] = newContentData.content;

    var query = queries.updateCourseContent(contentID);

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
exports.deleteCourseContentByID = function(prevID, currentID, nextID, RepositoryCallback){
    var fnName = "deleteCourseContentByID";

    var transactionQueries = {
        deleteQuery: queries.deleteCourseContent(currentID),
        updateQuery: queries.updateCourseContent(nextID),
        updateAttributes: {prev_content_id: prevID}
    };

    async.waterfall([function(GenericCallback){
            Generic.deleteLinkedListRecord(transactionQueries, REPOSITORY, fnName, COURSE_CONTENT, GenericCallback)
        }],
        function(err, done) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, done);
        }
    );
    //var query = queries.deleteCourseContent(currentID);
    //
    //async.waterfall([
    //    function(GenericCallback){
    //        Generic.deleteRecords(query, false, REPOSITORY, fnName, COURSE_CONTENT, GenericCallback);
    //    },
    //    function(done, GenericCallback){
    //        exports.updateCourseContentByID(nextID, {prevID: prevID},  GenericCallback);
    //    }],
    //    function(err, done) {
    //        if(err != null)
    //            return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
    //        else
    //            return RepositoryCallback(null, done);
    //    }
    //);
};

exports.insertCourseContent = function(contentData, nextContentID, RepositoryCallback)  {
    var fnName = 'insertCourseContent';

    var transactionQueries = {
        insertQuery: queries.insertCourseContent,
        insertData: {
            prev_content_id: contentData.prevID,
            content: contentData.content,
            course_id: contentData.courseID
        },
        updateQuery: queries.updateCourseContent(nextContentID),
        updateFieldName: 'prev_content_id'
    };

    async.waterfall([function(GenericCallback){
        Generic.insertLinkedListRecord(transactionQueries, REPOSITORY, fnName, COURSE_CONTENT, GenericCallback)
    }],
        function(err, done) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, done);
        }
    );
    //var query = queries.insertCourseContent;
    //var insertNewContent = function(GenericCallback){
    //    Generic.insertRecord(query, {
    //        prev_content_id: contentData.prevID,
    //        content: contentData.content,
    //        course_id: contentData.courseID
    //    }, REPOSITORY, fnName, COURSE_CONTENT, GenericCallback);
    //};
    //var updateNextContent = function(newContentID, GenericCallback){
    //    exports.updateCourseContentByID(nextContentID, {prevID: newContentID},  GenericCallback);
    //};
    //
    //async.waterfall([insertNewContent, updateNextContent],
    //    function(err, done) {
    //        if(err != null)
    //            return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
    //        else
    //            return RepositoryCallback(null, done);
    //    }
    //);
};

