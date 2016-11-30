/**
 * Created by Ahmed Mater on 11/4/2016.
 */

var async = require('async');
var lookupRepository = rootRequire('LookupRepository');

var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');

module.exports = {
    getAllUserRoles: function(RESTCallBack) {
        async.waterfall([
                function(RepositoryCallBack) {
                    lookupRepository.getAllUserRoles(RepositoryCallBack);
                }],
            function(err, result) {
                if(err != null)
                    Logger.error(SystemParam.SERVICES, "getAllUserRoles", err.message);

                RESTCallBack(err, result);
            }
        );
    },
    getUserRole_ByName: function(name, RESTCallBack) {
        async.waterfall([
                function(RepositoryCallBack) {
                    lookupRepository.getUserRole_ByName(name, RepositoryCallBack);
                }],
            function(err, result) {
                if(err != null)
                    Logger.error(SystemParam.SERVICES, "getUserRole_ByName", err.message);

                RESTCallBack(err, result);
            }
        );
    },
    getUserRole_ByID: function(id, RESTCallBack) {
        async.waterfall([
                function(RepositoryCallBack) {
                    lookupRepository.getUserRole_ByID(id, RepositoryCallBack);
                }],
            function(err, result) {
                if(err != null)
                    Logger.error(SystemParam.SERVICES, "getUserRole_ByID", err.message);

                RESTCallBack(err, result);
            }
        );
    },

    getAllCourseLevels: function(RESTCallBack) {
        async.waterfall([
                function(RepositoryCallBack) {
                    lookupRepository.getAllCourseLevels(RepositoryCallBack);
                }],
            function(err, result) {
                if(err != null)
                    Logger.error(SystemParam.SERVICES, "getAllCourseLevels", err.message);

                RESTCallBack(err, result);
            }
        );
    },
    getCourseLevel_ByName: function(name, RESTCallBack) {
        async.waterfall([
                function(RepositoryCallBack) {
                    lookupRepository.getCourseLevel_ByName(name, RepositoryCallBack);
                }],
            function(err, result) {
                if(err != null)
                    Logger.error(SystemParam.SERVICES, "getCourseLevel_ByName", err.message);

                RESTCallBack(err, result);
            }
        );
    },
    getCourseLevel_ByID: function(id, RESTCallBack) {
        async.waterfall([
                function(RepositoryCallBack) {
                    lookupRepository.getCourseLevel_ByID(id, RepositoryCallBack);
                }],
            function(err, result) {
                if(err != null)
                    Logger.error(SystemParam.SERVICES, "getCourseLevel_ByID", err.message);

                RESTCallBack(err, result);
            }
        );
    },

    getAllCourseTypes: function(RESTCallBack) {
        async.waterfall([
                function(RepositoryCallBack) {
                    lookupRepository.getAllCourseTypes(RepositoryCallBack);
                }],
            function(err, result) {
                if(err != null)
                    Logger.error(SystemParam.SERVICES, "getAllCourseTypes", err.message);

                RESTCallBack(err, result);
            }
        );
    },
    getCourseType_ByName: function(name, RESTCallBack) {
        async.waterfall([
                function(RepositoryCallBack) {
                    lookupRepository.getCourseType_ByName(name, RepositoryCallBack);
                }],
            function(err, result) {
                if(err != null)
                    Logger.error(SystemParam.SERVICES, "getCourseType_ByName", err.message);

                RESTCallBack(err, result);
            }
        );
    },
    getCourseType_ByID: function(id, RESTCallBack) {
        async.waterfall([
                function(RepositoryCallBack) {
                    lookupRepository.getCourseType_ByID(id, RepositoryCallBack);
                }],
            function(err, result) {
                if(err != null)
                    Logger.error(SystemParam.SERVICES, "getCourseType_ByID", err.message);

                RESTCallBack(err, result);
            }
        );
    },

    getAllReferenceTypes: function(RESTCallBack) {
        async.waterfall([
                function(RepositoryCallBack) {
                    lookupRepository.getAllReferenceTypes(RepositoryCallBack);
                }],
            function(err, result) {
                if(err != null)
                    Logger.error(SystemParam.SERVICES, "getAllReferenceTypes", err.message);

                RESTCallBack(err, result);
            }
        );
    },
    getReferenceType_ByName: function(name, RESTCallBack) {
        async.waterfall([
                function(RepositoryCallBack) {
                    lookupRepository.getReferenceType_ByName(name, RepositoryCallBack);
                }],
            function(err, result) {
                if(err != null)
                    Logger.error(SystemParam.SERVICES, "getReferenceType_ByName", err.message);

                RESTCallBack(err, result);
            }
        );
    },
    getReferenceType_ByID: function(id, RESTCallBack) {
        async.waterfall([
                function(RepositoryCallBack) {
                    lookupRepository.getReferenceType_ByID(id, RepositoryCallBack);
                }],
            function(err, result) {
                if(err != null)
                    Logger.error(SystemParam.SERVICES, "getReferenceType_ByID", err.message);

                RESTCallBack(err, result);
            }
        );
    },
};