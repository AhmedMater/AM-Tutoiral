/**
 * Created by Ahmed Mater on 11/20/2016.
 */

var config = rootRequire('configuration');
var DB = rootRequire('AM-Database');

var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');

module.exports = {
    insertCourse: function(courseData, RepositoryCallBack) {

        DB.query('INSERT INTO course SET ?', {
            name: courseData.courseName,
            period: courseData.coursePeriod,
            course_level_id: courseData.courseLevelID,
            course_type_id: courseData.courseTypeID,
            playlist_link: courseData.youTubePlaylist,
            description: courseData.courseDescription
        }, function (err, rows, fields) {
            if (err != null) {
                Logger.error(SystemParam.REPOSITORY, "insertCourse", err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), false);
            }

            RepositoryCallBack(null, true);
        });
    },

    insertCourseContents: function(courseContentArray, RepositoryCallBack) {
        var query = 'INSERT INTO course_content (course_id, num, content) VALUES ?';

        DB.query(query, courseContentArray, function (err, rows, fields) {
            if (err != null) {
                Logger.error(SystemParam.REPOSITORY, "insertCourseContents", err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), false);
            }

            RepositoryCallBack(null, true);
        });
    },
    insertCourseObjectives: function(courseObjectivesArray, RepositoryCallBack) {
        var query = 'INSERT INTO course_objective (course_id, num, objective) VALUES ?';

        DB.query(query, courseObjectivesArray, function (err, rows, fields) {
            if (err != null) {
                Logger.error(SystemParam.REPOSITORY, "insertCourseObjectives", err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), false);
            }

            RepositoryCallBack(null, true);
        });
    },
    insertCoursePreRequisites: function(coursePreRequisitesArray, RepositoryCallBack) {
        var query = 'INSERT INTO course_pre_requisite (course_id, name, url) VALUES ?';

        DB.query(query, coursePreRequisitesArray, function (err, rows, fields) {
            if (err != null) {
                Logger.error(SystemParam.REPOSITORY, "insertCoursePreRequisites", err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), false);
            }

            RepositoryCallBack(null, true);
        });
    },
    insertCourseReferences: function(courseReferencesArray, RepositoryCallBack) {
        var query = 'INSERT INTO course_reference (course_id, name, type_id, url) VALUES ?';

        DB.query(query, courseReferencesArray, function (err, rows, fields) {
            if (err != null) {
                Logger.error(SystemParam.REPOSITORY, "insertCourseReferences", err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), false);
            }

            RepositoryCallBack(null, true);
        });
    },

    isCourseFound: function(courseName, youTubePlaylist, RepositoryCallBack){
        var fnName = "isCourseFound";

        var query =
            "SELECT id FROM course WHERE " +
                "name = " + DB.escape(courseName) + " OR " +
                "playlist_link = " + DB.escape(youTubePlaylist) + ";";

        DB.query(query, function (err, rows, fields) {
            var isFound = null;
            if (err != null) {
                Logger.error(SystemParam.REPOSITORY, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), null);
            }

            if (rows[0] != null) {
                Logger.info(fnName, ErrMsg.INFO_7);
                isFound = true;
            } else {
                Logger.info(fnName, ErrMsg.INFO_8);
                isFound = false;
            }

            RepositoryCallBack(err, isFound);
        });

    },

    getCourseID: function(courseName, youTubePlaylist, RepositoryCallBack){
        var fnName = "getCourseID";

        var query =
            "SELECT id FROM course WHERE" +
                " name " + DB.escape(courseName) + " AND " +
                " playlist_link " + DB.escape(youTubePlaylist);

        DB.query(query, function (err, rows, fields) {
            if (err != null) {
                Logger.error(SystemParam.REPOSITORY, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), null);
            }

            var courseID = null;
            if(rows != null){
                courseID = rows[0].id;

                Logger.info(fnName, 'Course ID is successfully retrieved');
            } else
                Logger.info(fnName, 'This Course isn\'t found in Database');

            RepositoryCallBack(err, courseID);
        });
    },

    getAllCourses: function(RepositoryCallBack) {
        var fnName = "getAllCourses";

        var query =
            "SELECT " +
            "id, name, value " +
            "FROM " +
            "lookup_user_role ";

        DB.query(query, function (err, rows, fields) {
            if (err != null) {
                Logger.error(SystemParam.REPOSITORY, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), null);
            }

            var coursesInfo = [];
            if(rows != null){
                for(var i=0 ; i<rows.length; i++)
                    coursesInfo.push({
                        id: rows[i].id,
                        name: rows[i].name,
                        value: rows[i].value
                    });

                Logger.info(fnName, ErrMsg.INFO_5);
            } else
                Logger.info(fnName, ErrMsg.INFO_6);

            RepositoryCallBack(err, coursesInfo);
        });
    },
    getCourse_ByName: function(name, RepositoryCallBack) {
        var fnName = "getCourse_ByName";
        var query =
            "SELECT " +
            "id, name, value " +
            "FROM " +
            "lookup_user_role " +
            "WHERE " +
            "name = " + DB.escape(name) +" ;";

        DB.query(query, function(err,rows,fields){
            if(err != null) {
                Logger.error(SystemParam.REPOSITORY, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), null);
            }

            var courseInfo = null;
            if (rows != null) {
                courseInfo = {
                    id: rows[0].id,
                    name: rows[0].name,
                    value: rows[0].value
                };

                Logger.info(fnName, ErrMsg.INFO_1);
            } else
                Logger.info(fnName, ErrMsg.INFO_2);


            RepositoryCallBack(err, courseInfo);
        });
    },
    getCourse_ByID: function(id, RepositoryCallBack) {
        var fnName = "getCourse_ByID";
        var query =
            "SELECT " +
            "id, name, value " +
            "FROM " +
            "lookup_user_role " +
            "WHERE " +
            "id = " + DB.escape(id) +" ;";

        DB.query(query, function(err,rows,fields){
            if(err != null) {
                Logger.error(SystemParam.REPOSITORY, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), null);
            }

            var courseInfo = null;
            if (rows != null) {
                courseInfo = {
                    id: rows[0].id,
                    name: rows[0].name,
                    value: rows[0].value
                };

                Logger.info(fnName, ErrMsg.INFO_1);
            } else
                Logger.info(fnName, ErrMsg.INFO_2);


            RepositoryCallBack(err, courseInfo);
        });
    }
};