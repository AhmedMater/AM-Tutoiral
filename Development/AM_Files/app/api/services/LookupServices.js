/**
 * Created by Ahmed Mater on 11/4/2016.
 */

var config = configRequire();
var async = require('async');
var lookupRepository = repositoryRequire('Lookup');

var ErrMsg = commonJSRequire('ErrorMessages');
var SystemParameters = commonJSRequire('SystemParameters');
var Logger = commonJSRequire('Logger');

module.exports = {
    getAllUserRoles: function(RESTCallBack) {
        async.waterfall([
                function(RepositoryCallBack) {
                    lookupRepository.getAllUserRoles(RepositoryCallBack);
                }],
            function(err, result) {
                if(err != null)
                    Logger.error(config.FOLDERS_NAMES.service, "getAllUserRoles", err.message);

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
                    Logger.error(config.FOLDERS_NAMES.service, "getUserRole_ByName", err.message);

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
                    Logger.error(config.FOLDERS_NAMES.service, "getUserRole_ByID", err.message);

                RESTCallBack(err, result);
            }
        );
    }
};