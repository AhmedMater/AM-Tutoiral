/**
 * Created by Ahmed Mater on 11/20/2016.
 */

var DB = rootRequire('AM-Database');
var async = require('async');

var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');
var Generic = rootRequire('GenericRepository');
var Models = rootRequire('Models');

var COURSE = "Course";
var COURSES = "Courses";
var DB_ERROR = SystemParam.DATABASE_ERROR;
var REPOSITORY = COURSE + SystemParam.REPOSITORY;

var exports = module.exports = {};

/**
 * It's a Repository function responsible for inserting new Course Record into the Database
 * Also inserting its Contents, Objectives, Prerequisites, References
 * @param userID ID of the User adding this Course
 * @param courseData Main Info of the Course
 * @param courseContentArray as Array of [num, content]
 * @param courseObjectivesArray as Array of [num, objective]
 * @param coursePreRequisitesArray as Array of [name, url]
 * @param courseReferencesArray as Array of [name, typeID, url]
 * @param RepositoryCallback
 * @param Boolean true - if succeeded <br/> false - if failed
 */
exports.insertFullCourse = function(userID, courseData, courseContentArray, courseObjectivesArray,
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
            description: courseData.courseDescription,
            user_id: userID
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
 * @param userID ID of the User adding this Course
 * @param courseData Course Data extracted from the New Course form
 * @param RepositoryCallback
 * @return Integer CourseID of the record in Database
 */
exports.insertCourse = function(userID, courseData, RepositoryCallback) {
    var fnName = "insertCourse";

    var query = 'INSERT INTO course SET ?';
    var recordData = {
        name: courseData.courseName,
        period: courseData.coursePeriod,
        course_level_id: courseData.courseLevelID,
        course_type_id: courseData.courseTypeID,
        playlist_link: courseData.youTubePlaylist,
        description: courseData.courseDescription,
        user_id: userID
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
            "description, date_of_course, c.last_updated, CONCAT(u.first_name, ' ', u.last_name) fullName " +
        "FROM course c " +
            "LEFT JOIN lookup_course_level level ON course_level_id = level.id " +
            "LEFT JOIN lookup_course_type type ON course_type_id = type.id " +
            "LEFT JOIN users u ON user_id = u.id " +
        "WHERE " +
            "c.id = " + DB.escape(courseID);

    async.waterfall([
            function(GenericCallback){ Generic.selectRecord(query, REPOSITORY, fnName, COURSE, GenericCallback); },
            function(data, ModelCallback){ Models.setCourse(data, ModelCallback); }
        ], function(err, User) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, User);
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
exports.updateCourseByID = function(courseID, newCourseData, RepositoryCallback){
    var fnName = "updateCourseByID";

    var attributes = {};

    if(newCourseData.courseName) attributes['name'] = newCourseData.courseName;
    if(newCourseData.coursePeriod) attributes['period'] = newCourseData.coursePeriod;
    if(newCourseData.courseLevelID) attributes['course_level_id'] = newCourseData.courseLevelID;
    if(newCourseData.courseTypeID) attributes['course_type_id'] = newCourseData.courseTypeID;
    if(newCourseData.youtTubePlayist) attributes['playlist_link'] = newCourseData.youtTubePlayist;
    if(newCourseData.courseDescription) attributes['description'] = newCourseData.courseDescription;

    attributes['last_updated'] = new Date();

    var query = "UPDATE course SET ? WHERE id = " + DB.escape(courseID);

    async.waterfall([ function(GenericCallback){Generic.updateRecord(query, attributes, REPOSITORY, fnName, COURSE, GenericCallback); }],
        function(err, done) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, done);
        }
    );
};

/**
 * It's a Repository function responsible for deleting the Course from the Database
 * But not fully delete only hidden the course
 * @param courseID ID of the Course to be deleted
 * @param RepositoryCallback
 * @return Boolean true if Deleting succeeded <br/>
 *                false if Deleting failed
 */
exports.deleteCourseByID = function(courseID, RepositoryCallback){
    var fnName = "deleteCourseByID";

    var attributes = {};

    attributes['is_deleted'] = 1;
    attributes['last_updated'] = new Date();

    var query = "UPDATE course SET ? WHERE id = " + DB.escape(courseID);

    async.waterfall([ function(GenericCallback){Generic.updateRecord(query, attributes, REPOSITORY, fnName, COURSE, GenericCallback); }],
        function(err, done) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, done);
        }
    );
};

/**
 * It's a Repository function responsible for Delete Course record from the Database
 * It's fully Deletion from the Database
 * @param courseID
 * @param RepositoryCallback
 * @return Boolean - true if Deleting Successfully Done <br/>
 *                  false if Deleting failed
 */
exports.fullDeleteCourseByID = function(courseID, RepositoryCallback){
    var fnName = "fullDeleteCourseByID";

    var query = "DELETE FROM course WHERE id = " + DB.escape(courseID);

    async.waterfall([
            function(GenericCallback){ Generic.deleteRecord(query, REPOSITORY, fnName, COURSE, GenericCallback); }],
        function(err, done) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, done);
        }
    );
};