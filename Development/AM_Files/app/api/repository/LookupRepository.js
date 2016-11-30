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

                Logger.info(fnName, ErrMsg.INFO_5);
            } else
                Logger.info(fnName, ErrMsg.INFO_6);

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

                Logger.info(fnName, ErrMsg.INFO_1);
            } else
                Logger.info(fnName, ErrMsg.INFO_2);


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

                Logger.info(fnName, ErrMsg.INFO_1);
            } else
                Logger.info(fnName, ErrMsg.INFO_2);


            RepositoryCallBack(err, courseLevel);
        });
    },

    getAllCourseTypes: function(RepositoryCallBack) {
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
    getCourseType_ByName: function(name, RepositoryCallBack) {
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
    getCourseType_ByID: function(id, RepositoryCallBack) {
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

    getAllReferenceTypes: function(RepositoryCallBack) {
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
    getReferenceType_ByName: function(name, RepositoryCallBack) {
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
    getReferenceType_ByID: function(id, RepositoryCallBack) {
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
};

