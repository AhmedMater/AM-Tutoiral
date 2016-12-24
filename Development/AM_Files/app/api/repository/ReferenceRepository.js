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

var COURSE_REFERENCES = "Course References";
var DB_ERROR = SystemParam.DATABASE_ERROR;
var REPOSITORY = COURSE_REFERENCES + SystemParam.REPOSITORY;

var exports = module.exports = {};

/**
 * It's a Repository function responsible for inserting new records of the Course References in the Database
 * @param courseReferencesArray as Array of [name, typeID, url]
 * @param RepositoryCallback
 * @return Boolean - true if the records are inserted successfully <br/> - false if it failed to insert the records
 */
exports.insertCourseReferences = function(courseID, courseReferencesArray, RepositoryCallback) {
    var fnName = "insertCourseReferences";

    var query = 'INSERT INTO course_reference (name, type_id, url, course_id) VALUES ?';
    courseReferencesArray.forEach(function(element){element.push(courseID);});

    async.waterfall([
            function(GenericCallback){ Generic.multiRecordInsert(query, [courseReferencesArray], REPOSITORY, fnName, COURSE, GenericCallback); }],
        function(err, done) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, done);
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
            function(data, ModelCallback){ Models.setAllReferences(data, ModelCallback); }
        ], function(err, courseReferences) {
            if(err != null)
                return RepositoryCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            else
                return RepositoryCallback(null, courseReferences);
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
exports.updateCourseReferenceByID_Num = function(courseID, referenceNum, newReferenceData, RepositoryCallback){
    var fnName = "updateCourseByID";

    var attributes = {};

    if(newReferenceData.num) attributes['num'] = newCourseData.courseName;
    if(newReferenceData.coursePeriod) attributes['period'] = newCourseData.coursePeriod;
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
exports.deleteCourseReferenceByID_Num = function(courseID, RepositoryCallback){
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
exports.fullDeleteCourseReferenceByID_Num = function(courseID, RepositoryCallback){
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