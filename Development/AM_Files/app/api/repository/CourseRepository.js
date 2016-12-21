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
var COURSE_OBJECTIVES = "Course Objectives";
var COURSE_CONTENTS = "Course Contents";
var COURSE_PREREQUISITES = "Course Prerequisites";
var COURSE_REFERENCES = "Course References";
var COURSES = "Courses";
var DB_ERROR = SystemParam.DATABASE_ERROR;
var REPOSITORY = COURSE + SystemParam.REPOSITORY;

var exports = module.exports = {};

/**
 * It's a Repository function responsible for inserting new Course Record into the Database
 * Also inserting its Contents, Objectives, Prerequisites, References
 * @param courseData
 * @param courseContentArray as Array of [num, content]
 * @param courseObjectivesArray as Array of [num, objective]
 * @param coursePreRequisitesArray as Array of [name, url]
 * @param courseReferencesArray as Array of [name, typeID, url]
 * @param RepositoryCallback
 * @param Boolean true - if succeeded <br/> false - if failed
 */
exports.insertFullCourse = function(courseData, courseContentArray, courseObjectivesArray,
            coursePreRequisitesArray, courseReferencesArray, RepositoryCallback) {
    var fnName = "insertFullCourse";
    var totalQueries = [];

    var courseQuery = {
        modelName: COURSE,
        query: 'INSERT INTO course SET ?',
        attributes: {
            name: courseData.courseName,
            period: courseData.coursePeriod,
            course_level_id: courseData.courseLevelID,
            course_type_id: courseData.courseTypeID,
            playlist_link: courseData.youTubePlaylist,
            description: courseData.courseDescription
        }
    };
    totalQueries.push(courseQuery);

    var courseContentQuery = {
        modelName: COURSE_CONTENTS,
        query: 'INSERT INTO course_content (num, content, course_id) VALUES ?',
        attributes: courseContentArray
    };
    totalQueries.push(courseContentQuery);

    var courseObjectiveQuery = {
        modelName: COURSE_OBJECTIVES,
        query: 'INSERT INTO course_objective (num, objective, course_id) VALUES ?',
        attributes: courseObjectivesArray
    };
    totalQueries.push(courseObjectiveQuery);

    var coursePreRequisitesQuery = {
        modelName: COURSE_PREREQUISITES,
        query: 'INSERT INTO course_pre_requisite (name, url, course_id) VALUES ?',
        attributes: coursePreRequisitesArray
    };
    totalQueries.push(coursePreRequisitesQuery);

    var courseReferencesQuery = {
        modelName: COURSE_REFERENCES,
        query: 'INSERT INTO course_reference (name, type_id, url, course_id) VALUES ?',
        attributes: courseReferencesArray
    };
    totalQueries.push(courseReferencesQuery);

    async.waterfall([
            function(GenericCallback){ Generic.multiTableInsert(totalQueries, REPOSITORY, fnName, GenericCallback); }],
        function(err, userID) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, userID);
        }
    );
};

/**
 * It's a Repository function responsible for inserting new Course record in the Database
 * @param courseData Course Data extracted from the New Course form
 * @param RepositoryCallback
 * @return int CourseID of the record in Database
 */
exports.insertCourse = function(courseData, RepositoryCallback) {
    var fnName = "insertCourse";

    var query = 'INSERT INTO course SET ?';
    var recordData = {
        name: courseData.courseName,
        period: courseData.coursePeriod,
        course_level_id: courseData.courseLevelID,
        course_type_id: courseData.courseTypeID,
        playlist_link: courseData.youTubePlaylist,
        description: courseData.courseDescription
    };

    async.waterfall([
            function(GenericCallback){ Generic.insertRecord(query, recordData, REPOSITORY, fnName, COURSE, GenericCallback); }],
        function(err, courseID) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, courseID);
        }
    );
};

/**
 * It's a Repository function responsible for inserting new Course record in the Database
 * @param courseData Course Data extracted from the New Course form
 * @param RepositoryCallback
 * @return true if Contents are inserted otherwise false
 */
exports.insertCourseContents = function(courseID, courseContentArray, RepositoryCallback) {
    var fnName = "insertCourse";

    var query = 'INSERT INTO course_content (num, content, course_id) VALUES ?';
    courseContentArray.forEach(function(element){element.push(courseID);});

    async.waterfall([
            function(GenericCallback){ Generic.multiRecordInsert(query, [courseContentArray], REPOSITORY, fnName, COURSE, GenericCallback); }],
        function(err, done) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, done);
        }
    );
};

/**
 * It's a Repository function responsible for retrieving all the Data of the Course from the Database by its Course ID
 * @param courseID
 * @param RepositoryCallback
 * @return Course Object has the data of the Course from the Database
 */
exports.selectCourseByID = function(courseID, RepositoryCallback) {
    var fnName = "selectCourseByID";
    var query =
        "SELECT " +
            "c.name courseName, period, level.name courseLevel, type.name courseType, playlist_link, " +
            "description, date_of_course, last_update " +
        "FROM course c " +
            "LEFT JOIN lookup_course_level level ON course_level_id = level.id " +
            "LEFT JOIN lookup_course_type type ON course_type_id = type.id " +
        "WHERE " +
            "c.id = " + DB.escape(courseID);

    async.waterfall([
            function(GenericCallback){ Generic.selectRecord(query, REPOSITORY, fnName, COURSE, GenericCallback); },
            function(data, ModelCallback){ CourseModel.setCourse(data, ModelCallback); }
        ], function(err, User) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, User);
        }
    );
};

/**
 * It's a Repository function responsible for retrieving all the Contents of a Course by its ID from the Database
 * @param RepositoryCallback
 * @return CourseContent[] Array of Course Contents Objects
 */
exports.selectAllCourseContentsByID = function(courseID, RepositoryCallback){
    var fnName = "selectAllCourseContentsByID";

    var query =
        "SELECT " +
            "cc.num, cc.content " +
        "FROM " +
            "course_content cc " +
                "LEFT JOIN course c ON c.id = cc.course_id " +
        "WHERE " +
            "c.id = " + DB.escape(courseID);

    async.waterfall([
            function(GenericCallback){ Generic.selectAllRecords(query, REPOSITORY, fnName, COURSE_CONTENTS, GenericCallback); },
            function(data, ModelCallback){ CourseModel.setAllCourseContents(data, ModelCallback); }
        ], function(err, courseContents) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, courseContents);
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
            function(data, ModelCallback){ CourseModel.setAllCourseObjectives(data, ModelCallback); }
        ], function(err, courseObjectives) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, courseObjectives);
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
            function(data, ModelCallback){ CourseModel.setAllCoursePrerequisites(data, ModelCallback); }
        ], function(err, coursePrerequisites) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, coursePrerequisites);
        }
    );
};

/**
 * It's a Repository function responsible for retrieving all the References of a Course by its ID from the Database
 * @param RepositoryCallback
 * @return Reference[] Array of Course References Objects
 */
exports.selectAllCourseReferencesByID = function(courseID, RepositoryCallback){
    var fnName = "selectAllCourseReferencesByID";

    var query =
        "SELECT " +
            "cr.name, l.name typeName, cr.url " +
        "FROM " +
        "course_reference cr " +
            "LEFT JOIN course c ON cr.course_id = c.id " +
            "LEFT JOIN lookup_reference_type l ON cr.type_id = l.id " +
        "WHERE " +
            "c.id = " + DB.escape(courseID);

    async.waterfall([
            function(GenericCallback){ Generic.selectAllRecords(query, REPOSITORY, fnName, COURSE_REFERENCES, GenericCallback); },
            function(data, ModelCallback){ CourseModel.setAllCourseReferences(data, ModelCallback); }
        ], function(err, courseReferences) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, courseReferences);
        }
    );
};
