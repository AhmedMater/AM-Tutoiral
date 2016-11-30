/**
 * Created by Ahmed Mater on 10/2/2016.
 */

var DB = rootRequire('AM-Database');

var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');

module.exports = {
    getAllUserRoles: function(RepositoryCallBack) {
        var fnName = "getAllUserRoles";

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

            var userRoles = [];
            if(rows != null){
                for(var i=0 ; i<rows.length; i++)
                    userRoles.push({
                        id: rows[i].id,
                        name: rows[i].name,
                        value: rows[i].value
                    });

                Logger.info(fnName, ErrMsg.INFO_5);
            } else
                Logger.info(fnName, ErrMsg.INFO_6);

            RepositoryCallBack(err, userRoles);
        });
    },
    getUserRole_ByName: function(name, RepositoryCallBack) {
        var fnName = "getUserRole_byName";
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

            var userRole = null;
            if (rows != null) {
                userRole = {
                    id: rows[0].id,
                    name: rows[0].name,
                    value: rows[0].value
                };

                Logger.info(fnName, ErrMsg.INFO_1);
            } else
                Logger.info(fnName, ErrMsg.INFO_2);


            RepositoryCallBack(err, userRole);
        });
    },
    getUserRole_ByID: function(id, RepositoryCallBack) {
        var fnName = "getUserRole_byID";
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

            var userRole = null;
            if (rows != null) {
                userRole = {
                    id: rows[0].id,
                    name: rows[0].name,
                    value: rows[0].value
                };

                Logger.info(fnName, ErrMsg.INFO_1);
            } else
                Logger.info(fnName, ErrMsg.INFO_2);


            RepositoryCallBack(err, userRole);
        });
    },

    getAllCourseLevels: function(RepositoryCallBack) {
        var fnName = "getAllCourseLevels";

        var query =
            "SELECT " +
                "id, name, value " +
            "FROM " +
                "lookup_course_level ";

        DB.query(query, function (err, rows, fields) {
            if (err != null) {
                Logger.error(SystemParam.REPOSITORY, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), null);
            }

            var courseLevels = [];
            if(rows != null){
                for(var i=0 ; i<rows.length; i++)
                    courseLevels.push({
                        id: rows[i].id,
                        name: rows[i].name,
                        value: rows[i].value
                    });

                Logger.info(fnName, ErrMsg.INFO_9);
            } else
                Logger.info(fnName, ErrMsg.INFO_10);

            RepositoryCallBack(err, courseLevels);
        });
    },
    getCourseLevel_ByName: function(name, RepositoryCallBack) {
        var fnName = "getCourseLevel_ByName";
        var query =
            "SELECT " +
                "id, name, value " +
            "FROM " +
                "lookup_course_level " +
            "WHERE " +
                "name = " + DB.escape(name) +" ;";

        DB.query(query, function(err,rows,fields){
            if(err != null) {
                Logger.error(SystemParam.REPOSITORY, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), null);
            }

            var courseLevel = null;
            if (rows != null) {
                courseLevel = {
                    id: rows[0].id,
                    name: rows[0].name,
                    value: rows[0].value
                };

                Logger.info(fnName, ErrMsg.INFO_11);
            } else
                Logger.info(fnName, ErrMsg.INFO_12);


            RepositoryCallBack(err, courseLevel);
        });
    },
    getCourseLevel_ByID: function(id, RepositoryCallBack) {
        var fnName = "getCourseLevel_ByID";
        var query =
            "SELECT " +
                "id, name, value " +
            "FROM " +
                "lookup_course_level " +
            "WHERE " +
                "id = " + DB.escape(id) +" ;";

        DB.query(query, function(err,rows,fields){
            if(err != null) {
                Logger.error(SystemParam.REPOSITORY, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), null);
            }

            var courseLevel = null;
            if (rows != null) {
                courseLevel = {
                    id: rows[0].id,
                    name: rows[0].name,
                    value: rows[0].value
                };

                Logger.info(fnName, ErrMsg.INFO_11);
            } else
                Logger.info(fnName, ErrMsg.INFO_12);

            RepositoryCallBack(err, courseLevel);
        });
    },

    getAllCourseTypes: function(RepositoryCallBack) {
        var fnName = "getAllCourseTypes";

        var query =
            "SELECT " +
                "id, name, value " +
            "FROM " +
                "lookup_course_type ";

        DB.query(query, function (err, rows, fields) {
            if (err != null) {
                Logger.error(SystemParam.REPOSITORY, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), null);
            }

            var courseTypes = [];
            if(rows != null){
                for(var i=0 ; i<rows.length; i++)
                    courseTypes.push({
                        id: rows[i].id,
                        name: rows[i].name,
                        value: rows[i].value
                    });

                Logger.info(fnName, ErrMsg.INFO_13);
            } else
                Logger.info(fnName, ErrMsg.INFO_14);

            RepositoryCallBack(err, courseTypes);
        });
    },
    getCourseType_ByName: function(name, RepositoryCallBack) {
        var fnName = "getCourseType_ByName";
        var query =
            "SELECT " +
                "id, name, value " +
            "FROM " +
                "lookup_course_type " +
            "WHERE " +
                "name = " + DB.escape(name) +" ;";

        DB.query(query, function(err,rows,fields){
            if(err != null) {
                Logger.error(SystemParam.REPOSITORY, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), null);
            }

            var courseType = null;
            if (rows != null) {
                courseType = {
                    id: rows[0].id,
                    name: rows[0].name,
                    value: rows[0].value
                };

                Logger.info(fnName, ErrMsg.INFO_15);
            } else
                Logger.info(fnName, ErrMsg.INFO_16);

            RepositoryCallBack(err, courseType);
        });
    },
    getCourseType_ByID: function(id, RepositoryCallBack) {
        var fnName = "getCourseType_ByID";

        var query =
            "SELECT " +
                "id, name, value " +
            "FROM " +
                "lookup_course_type " +
            "WHERE " +
                "id = " + DB.escape(id) +" ;";

        DB.query(query, function(err,rows,fields){
            if(err != null) {
                Logger.error(SystemParam.REPOSITORY, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), null);
            }

            var courseType = null;
            if (rows != null) {
                courseType = {
                    id: rows[0].id,
                    name: rows[0].name,
                    value: rows[0].value
                };

                Logger.info(fnName, ErrMsg.INFO_15);
            } else
                Logger.info(fnName, ErrMsg.INFO_16);

            RepositoryCallBack(err, courseType);
        });
    },

    getAllReferenceTypes: function(RepositoryCallBack) {
        var fnName = "getAllReferenceTypes";

        var query =
            "SELECT " +
                "id, name, value " +
            "FROM " +
                "lookup_reference_type ";

        DB.query(query, function (err, rows, fields) {
            if (err != null) {
                Logger.error(SystemParam.REPOSITORY, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), null);
            }

            var referenceTypes = [];
            if(rows != null){
                for(var i=0 ; i<rows.length; i++)
                    referenceTypes.push({
                        id: rows[i].id,
                        name: rows[i].name,
                        value: rows[i].value
                    });

                Logger.info(fnName, ErrMsg.INFO_17);
            } else
                Logger.info(fnName, ErrMsg.INFO_18);

            RepositoryCallBack(err, referenceTypes);
        });
    },
    getReferenceType_ByName: function(name, RepositoryCallBack) {
        var fnName = "getReferenceType_ByName";

        var query =
            "SELECT " +
                "id, name, value " +
            "FROM " +
                "lookup_reference_type " +
            "WHERE " +
                "name = " + DB.escape(name) +" ;";

        DB.query(query, function(err,rows,fields){
            if(err != null) {
                Logger.error(SystemParam.REPOSITORY, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), null);
            }

            var referenceType = null;
            if (rows != null) {
                referenceType = {
                    id: rows[0].id,
                    name: rows[0].name,
                    value: rows[0].value
                };

                Logger.info(fnName, ErrMsg.INFO_19);
            } else
                Logger.info(fnName, ErrMsg.INFO_20);

            RepositoryCallBack(err, referenceType);
        });
    },
    getReferenceType_ByID: function(id, RepositoryCallBack) {
        var fnName = "getReferenceType_ByID";

        var query =
            "SELECT " +
                "id, name, value " +
            "FROM " +
                "lookup_reference_type " +
            "WHERE " +
                "id = " + DB.escape(id) +" ;";

        DB.query(query, function(err,rows,fields){
            if(err != null) {
                Logger.error(SystemParam.REPOSITORY, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), null);
            }

            var referenceType = null;
            if (rows != null) {
                referenceType = {
                    id: rows[0].id,
                    name: rows[0].name,
                    value: rows[0].value
                };

                Logger.info(fnName, ErrMsg.INFO_19);
            } else
                Logger.info(fnName, ErrMsg.INFO_20);

            RepositoryCallBack(err, referenceType);
        });
    },
};

