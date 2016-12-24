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

var COURSE_OBJECTIVES = "Course Objectives";
var DB_ERROR = SystemParam.DATABASE_ERROR;
var REPOSITORY = COURSE_OBJECTIVES + SystemParam.REPOSITORY;

var exports = module.exports = {};
/**
 * It's a Repository function responsible for inserting new records of the Course Objectives in the Database
 * @param courseObjectiveArray as Array of [num, objective]
 * @param RepositoryCallback
 * @return Boolean - true if the records are inserted successfully <br/> - false if it failed to insert the records
 */
exports.insertCourseObjectives = function(courseID, courseObjectiveArray, RepositoryCallback) {
    var fnName = "insertCourseObjectives";

    var query = 'INSERT INTO course_objective (num, objective, course_id) VALUES ?';
    courseObjectiveArray.forEach(function(element){element.push(courseID);});

    async.waterfall([
            function(GenericCallback){ Generic.multiRecordInsert(query, [courseObjectiveArray], REPOSITORY, fnName, COURSE, GenericCallback); }],
        function(err, done) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, done);
        }
    );
};

/**
 * It's a Repository function responsible for retrieving all the Objectives of a Course by its ID from the Database
 * @param RepositoryCallback
 * @return CourseObjective[] Array of Course Objectives Objects
 */
exports.selectAllCourseObjectivesByID = function(courseID, RepositoryCallback){
    var fnName = "selectAllCourseObjectivesByID";

    var query =
        "SELECT " +
        "co.num, co.objective " +
        "FROM " +
        "course_objective co " +
        "LEFT JOIN course c ON c.id = co.course_id " +
        "WHERE " +
        "c.id = " + DB.escape(courseID);

    async.waterfall([
            function(GenericCallback){ Generic.selectAllRecords(query, REPOSITORY, fnName, COURSE_OBJECTIVES, GenericCallback); },
            function(data, ModelCallback){ Models.setAllObjectives(data, ModelCallback); }
        ], function(err, courseObjectives) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, courseObjectives);
        }
    );
};
