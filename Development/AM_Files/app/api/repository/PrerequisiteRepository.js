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

var COURSE_PREREQUISITES = "Course Prerequisites";
var DB_ERROR = SystemParam.DATABASE_ERROR;
var REPOSITORY = COURSE_PREREQUISITES + SystemParam.REPOSITORY;

var exports = module.exports = {};

/**
 * It's a Repository function responsible for inserting new records of the Course Prerequisites in the Database
 * @param coursePreRequisitesArray as as Array of [name, url]
 * @param RepositoryCallback
 * @return Boolean - true if the records are inserted successfully <br/> - false if it failed to insert the records
 */
exports.insertCoursePrerequisites = function(courseID, coursePreRequisitesArray, RepositoryCallback) {
    var fnName = "insertCoursePrerequisites";

    var query = 'INSERT INTO course_pre_requisite (name, url, course_id) VALUES ?';
    coursePreRequisitesArray.forEach(function(element){element.push(courseID);});

    async.waterfall([
            function(GenericCallback){ Generic.multiRecordInsert(query, [coursePreRequisitesArray], REPOSITORY, fnName, COURSE, GenericCallback); }],
        function(err, done) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, done);
        }
    );
};

/**
 * It's a Repository function responsible for retrieving all the Prerequisites of a Course by its ID from the Database
 * @param RepositoryCallback
 * @return Prerequisite[] Array of Course Prerequisites Objects
 */
exports.selectAllCoursePrerequisitesByID = function(courseID, RepositoryCallback){
    var fnName = "selectAllCoursePrerequisitesByID";

    var query =
        "SELECT " +
        "cp.name, cp.url " +
        "FROM " +
        "course_pre_requisite cp " +
        "LEFT JOIN course c ON c.id = cp.course_id " +
        "WHERE " +
        "c.id = " + DB.escape(courseID);

    async.waterfall([
            function(GenericCallback){ Generic.selectAllRecords(query, REPOSITORY, fnName, COURSE_PREREQUISITES, GenericCallback); },
            function(data, ModelCallback){ Models.setAllPrerequisites(data, ModelCallback); }
        ], function(err, coursePrerequisites) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, coursePrerequisites);
        }
    );
};
