/**
 * Created by Ahmed Mater on 10/16/2016.
 */

var Security = require('./api/common/javaScript/Security');
var Logger = require('./api/common/javaScript/Logger');
var LookupService = require('./api/services/Lookup');
var exports = module.exports = {};

exports.initApp = function(app) {

    // Applying Sessions
    Security.applySession(app);

    // Open the Log file
    Logger.openLogFile();

    // Initialize System Parameters
    LookupService.loadLookupData();
};