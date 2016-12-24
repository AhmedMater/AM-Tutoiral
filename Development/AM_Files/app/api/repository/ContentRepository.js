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
    var j = 1;

    var firstInsertingContent = function(GenericCallback){
        Generic.insertRecord(query, courseContentArray[0], REPOSITORY, fnName, COURSE_CONTENT, GenericCallback);
    };
    var insertingContents = function(prevContentID, GenericCallback){
        courseContentArray[j].prev_content_id = prevContentID;
        Generic.insertRecord(query, courseContentArray[j++], REPOSITORY, fnName, COURSE_CONTENT, GenericCallback);
    };

    var insertingContentsArray = [firstInsertingContent];

    for(var i=0; i<courseContentArray.length-1; i++){
        insertingContentsArray.push(insertingContents);
    }

    async.waterfall(insertingContentsArray, function(err, contentID) {
        if (err != null)
            return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
        else
            return RepositoryCallback(null, done);

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
exports.selectCourseContentByID_Num = function(courseID, num, RepositoryCallback){
    var fnName = "selectAllCourseContentsByID";

    var query = "SELECT cc.num, cc.content FROM course_content " +
        "WHERE course_id = " + DB.escape(courseID) + " AND num = " + DB.escape(num);

    async.waterfall([
            function(GenericCallback){ Generic.selectAllRecords(query, REPOSITORY, fnName, COURSE_CONTENTS, GenericCallback); },
            function(data, ModelCallback){ Models.setContent(data, ModelCallback); }
        ], function(err, courseContents) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, courseContents);
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
exports.updateCourseContentByID_Num = function(courseID, num, content, RepositoryCallback){
    var fnName = "updateCourseContentsByID_Num";

    var attributes = {};

    attributes['content'] = content;

    var query = "UPDATE course_content SET ? WHERE num = " + DB.escape(num);

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

