/**
 * Created by Ahmed Mater on 11/20/2016.
 */

var DB = rootRequire('AM-Database');
var async = require('async');

var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');
var Generic = rootRequire('GenericRepository');
var CourseModel = rootRequire('CourseModel');

var COURSE = "Course";
var COURSE_OBJECTIVE = "Course Objective";
var COURSE_CONTENT = "Course Content";
var COURSE_PREREQUISITE = "Course Prerequisite";
var COURSE_REFERENCE = "Course Reference";
var COURSES = "Courses";
var DB_ERROR = SystemParam.DATABASE_ERROR;
var REPOSITORY = COURSE + SystemParam.REPOSITORY;

var exports = module.exports = {};

/**
 * It's a Repository function responsible for inserting new User record in the Database
 * @param userData User Data extracted from the Sign Up form
 * @param RepositoryCallback
 * @return int UserID of the record in Database
 * @throws Error - if there is error in the Query
 * @throws Error
 */
exports.insertCourse = function(courseData, courseContentArray, courseObjectivesArray,
            coursePreRequisitesArray, courseReferencesArray, RepositoryCallback) {
    var fnName = "insertCourse";

    var queries = [];
    var attributes = [];
    var modelNames = [];

    // Course Query
    queries.push('INSERT INTO course SET ?');
    attributes.push({
        name: courseData.courseName,
        period: courseData.coursePeriod,
        course_level_id: courseData.courseLevelID,
        course_type_id: courseData.courseTypeID,
        playlist_link: courseData.youTubePlaylist,
        description: courseData.courseDescription
    });
    modelNames.push(COURSE);

    // Course Contents Query
    queries.push('INSERT INTO course_content (num, content, course_id) VALUES ?');
    attributes.push(courseContentArray);
    modelNames.push(COURSE_CONTENT);

    // Course Objective Query
    queries.push('INSERT INTO course_objective (num, objective, course_id) VALUES ?');
    attributes.push(courseObjectivesArray);
    modelNames.push(COURSE_OBJECTIVE);

    // Course Pre-requisite Query
    queries.push('INSERT INTO course_pre_requisite (name, url, course_id) VALUES ?');
    attributes.push(coursePreRequisitesArray);
    modelNames.push(COURSE_PREREQUISITE);

    // Course References Query
    queries.push('INSERT INTO course_reference (name, type_id, url, course_id) VALUES ?');
    attributes.push(courseReferencesArray);
    modelNames.push(COURSE_REFERENCE);

    async.waterfall([
            function(GenericCallback){ Generic.multiInsertRecords(queries, attributes, REPOSITORY, fnName, COURSE, GenericCallback); }],
        function(err, userID) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, userID);
        }
    );
};

//exports.insertCourse = function(courseData, RepositoryCallback) {
//
//    DB.query('INSERT INTO course SET ?', {
//        name: courseData.courseName,
//        period: courseData.coursePeriod,
//        course_level_id: courseData.courseLevelID,
//        course_type_id: courseData.courseTypeID,
//        playlist_link: courseData.youTubePlaylist,
//        description: courseData.courseDescription
//    }, function (err, rows, fields) {
//        if (err != null) {
//            Logger.error(SystemParam.REPOSITORY, "insertCourse", err.message);
//            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), false);
//        }
//
//        RepositoryCallback(null, true);
//    });
//};

//exports.insertCourseContents = function(courseContentArray, RepositoryCallback) {
//    var query = 'INSERT INTO course_content (course_id, num, content) VALUES ?';
//
//    DB.query(query, courseContentArray, function (err, rows, fields) {
//        if (err != null) {
//            Logger.error(SystemParam.REPOSITORY, "insertCourseContents", err.message);
//            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), false);
//        }
//
//        RepositoryCallback(null, true);
//    });
//};

//exports.insertCourseObjectives = function(courseObjectivesArray, RepositoryCallback) {
//    var query = 'INSERT INTO course_objective (course_id, num, objective) VALUES ?';
//
//    DB.query(query, courseObjectivesArray, function (err, rows, fields) {
//        if (err != null) {
//            Logger.error(SystemParam.REPOSITORY, "insertCourseObjectives", err.message);
//            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), false);
//        }
//
//        RepositoryCallback(null, true);
//    });
//};

//exports.insertCoursePreRequisites = function(coursePreRequisitesArray, RepositoryCallback) {
//    var query = 'INSERT INTO course_pre_requisite (course_id, name, url) VALUES ?';
//
//    DB.query(query, coursePreRequisitesArray, function (err, rows, fields) {
//        if (err != null) {
//            Logger.error(SystemParam.REPOSITORY, "insertCoursePreRequisites", err.message);
//            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), false);
//        }
//
//        RepositoryCallback(null, true);
//    });
//};

//exports.insertCourseReferences = function(courseReferencesArray, RepositoryCallback) {
//    var query = 'INSERT INTO course_reference (course_id, name, type_id, url) VALUES ?';
//
//    DB.query(query, courseReferencesArray, function (err, rows, fields) {
//        if (err != null) {
//            Logger.error(SystemParam.REPOSITORY, "insertCourseReferences", err.message);
//            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), false);
//        }
//
//        RepositoryCallback(null, true);
//    });
//};

exports.isCourseFound = function(courseName, youTubePlaylist, RepositoryCallback){
    var fnName = "isCourseFound";

    var query =
        "SELECT id FROM course " +
        "WHERE " +
            "name = " + DB.escape(courseName) + " OR " +
            "playlist_link = " + DB.escape(youTubePlaylist) + ";";

    DB.query(query, function (err, rows, fields) {
        var isFound = null;
        if (err != null) {
            Logger.error(SystemParam.REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), null);
        }

        if (rows[0] != null) {
            Logger.debug(SystemParam.REPOSITORY, fnName, ErrMsg.info_1_Found("Course"));
            return RepositoryCallback(err, true);
        } else {
            Logger.debug(SystemParam.REPOSITORY, fnName, ErrMsg.info_2_NotFound("Course"));
            return RepositoryCallback(err, false);
        }
    });
};

exports.selectCourseID = function(courseName, youTubePlaylist, RepositoryCallback){
    var fnName = "selectCourseID";

    var query =
        "SELECT id FROM course " +
        "WHERE" +
            "name " + DB.escape(courseName) + " AND " +
            "playlist_link " + DB.escape(youTubePlaylist);

    DB.query(query, function (err, rows, fields) {
        if (err != null) {
            Logger.error(SystemParam.REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), null);
        }

        if (rows[0] != null) {
            Logger.debug(SystemParam.REPOSITORY, fnName, ErrMsg.info_1_Found("Course"));
            return RepositoryCallback(err, rows[0].id);
        } else {
            Logger.debug(SystemParam.REPOSITORY, fnName, ErrMsg.info_2_NotFound("Course"));
            return RepositoryCallback(err, -1);
        }
    });
};
