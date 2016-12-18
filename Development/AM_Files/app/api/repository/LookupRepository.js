/**
 * Created by Ahmed Mater on 10/2/2016.
 */

var DB = rootRequire('AM-Database');

var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');

var exports = module.exports = {};

exports.selectAllUserRoles = function(RepositoryCallback) {
    var fnName = "exports.selectAllUserRoles";

    var query =
        "SELECT " +
            "id, name, value " +
        "FROM " +
            "lookup_user_role ";

    DB.query(query, function (err, rows, fields) {
        if (err != null) {
            Logger.error(SystemParam.REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), null);
        }
        
        if(rows.length == 0){
            Logger.error(SystemParam.REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), null);
        }

        var userRoles = [];
        for(var i=0; i<rows.length; i++)
            userRoles.push({
                id: rows[i].id,
                name: rows[i].name,
                value: rows[i].value
            });

        RepositoryCallback(err, userRoles);
    });
};
exports.selectUserRoleByName = function(name, RepositoryCallback) {
    var fnName = "selectUserRoleByName";
    var query =
        "SELECT " +
        "id, name, value " +
        "FROM " +
        "lookup_user_role " +
        "WHERE " +
        "name: " + DB.escape(name) +" ;";

    DB.query(query, function(err,rows,fields){
        if(err != null) {
            Logger.error(SystemParam.REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), null);
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


        RepositoryCallback(err, userRole);
    });
};
exports.selectUserRole_ByID = function(id, RepositoryCallback) {
    var fnName = "exports.selectUserRole_byID";
    var query =
        "SELECT " +
        "id, name, value " +
        "FROM " +
        "lookup_user_role " +
        "WHERE " +
        "id: " + DB.escape(id) +" ;";

    DB.query(query, function(err,rows,fields){
        if(err != null) {
            Logger.error(SystemParam.REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), null);
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


        RepositoryCallback(err, userRole);
    });
};

exports.selectAllCourseLevels = function(RepositoryCallback) {
    var fnName = "exports.selectAllCourseLevels";

    var query =
        "SELECT " +
        "id, name, value " +
        "FROM " +
        "lookup_course_level ";

    DB.query(query, function (err, rows, fields) {
        if (err != null) {
            Logger.error(SystemParam.REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), null);
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

        RepositoryCallback(err, courseLevels);
    });
};
exports.selectCourseLevel_ByName = function(name, RepositoryCallback) {
    var fnName = "exports.selectCourseLevel_ByName";
    var query =
        "SELECT " +
        "id, name, value " +
        "FROM " +
        "lookup_course_level " +
        "WHERE " +
        "name: " + DB.escape(name) +" ;";

    DB.query(query, function(err,rows,fields){
        if(err != null) {
            Logger.error(SystemParam.REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), null);
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


        RepositoryCallback(err, courseLevel);
    });
};
exports.selectCourseLevel_ByID = function(id, RepositoryCallback) {
    var fnName = "exports.selectCourseLevel_ByID";
    var query =
        "SELECT " +
        "id, name, value " +
        "FROM " +
        "lookup_course_level " +
        "WHERE " +
        "id: " + DB.escape(id) +" ;";

    DB.query(query, function(err,rows,fields){
        if(err != null) {
            Logger.error(SystemParam.REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), null);
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

        RepositoryCallback(err, courseLevel);
    });
};

exports.selectAllCourseTypes = function(RepositoryCallback) {
    var fnName = "exports.selectAllCourseTypes";

    var query =
        "SELECT " +
        "id, name, value " +
        "FROM " +
        "lookup_course_type ";

    DB.query(query, function (err, rows, fields) {
        if (err != null) {
            Logger.error(SystemParam.REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), null);
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

        RepositoryCallback(err, courseTypes);
    });
};
exports.selectCourseType_ByName = function(name, RepositoryCallback) {
    var fnName = "exports.selectCourseType_ByName";
    var query =
        "SELECT " +
        "id, name, value " +
        "FROM " +
        "lookup_course_type " +
        "WHERE " +
        "name: " + DB.escape(name) +" ;";

    DB.query(query, function(err,rows,fields){
        if(err != null) {
            Logger.error(SystemParam.REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), null);
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

        RepositoryCallback(err, courseType);
    });
};
exports.selectCourseType_ByID = function(id, RepositoryCallback) {
    var fnName = "exports.selectCourseType_ByID";

    var query =
        "SELECT " +
        "id, name, value " +
        "FROM " +
        "lookup_course_type " +
        "WHERE " +
        "id: " + DB.escape(id) +" ;";

    DB.query(query, function(err,rows,fields){
        if(err != null) {
            Logger.error(SystemParam.REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), null);
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

        RepositoryCallback(err, courseType);
    });
};

exports.selectAllReferenceTypes = function(RepositoryCallback) {
    var fnName = "exports.selectAllReferenceTypes";

    var query =
        "SELECT " +
        "id, name, value " +
        "FROM " +
        "lookup_reference_type ";

    DB.query(query, function (err, rows, fields) {
        if (err != null) {
            Logger.error(SystemParam.REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), null);
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

        RepositoryCallback(err, referenceTypes);
    });
};
exports.selectReferenceType_ByName = function(name, RepositoryCallback) {
    var fnName = "exports.selectReferenceType_ByName";

    var query =
        "SELECT " +
        "id, name, value " +
        "FROM " +
        "lookup_reference_type " +
        "WHERE " +
        "name: " + DB.escape(name) +" ;";

    DB.query(query, function(err,rows,fields){
        if(err != null) {
            Logger.error(SystemParam.REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), null);
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

        RepositoryCallback(err, referenceType);
    });
};
exports.selectReferenceType_ByID = function(id, RepositoryCallback) {
    var fnName = "exports.selectReferenceType_ByID";

    var query =
        "SELECT " +
        "id, name, value " +
        "FROM " +
        "lookup_reference_type " +
        "WHERE " +
        "id: " + DB.escape(id) +" ;";

    DB.query(query, function(err,rows,fields){
        if(err != null) {
            Logger.error(SystemParam.REPOSITORY, fnName, err.message);
            return RepositoryCallback(ErrMsg.createError(SystemParam.DATABASE_ERROR, err.message), null);
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

        RepositoryCallback(err, referenceType);
    });
};
