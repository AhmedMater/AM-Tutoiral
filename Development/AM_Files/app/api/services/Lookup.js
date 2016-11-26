/**
 * Created by Ahmed Mater on 11/4/2016.
 */

var config = require('../../configuration');
var SystemParameters = require(config.Common.SystemParameters);

var exports = module.exports = {
    getAllCourseLevels: function(){
        return SystemParameters.CourseLevel;
    },
    getAllCourseTypes: function(){
        return SystemParameters.CourseType;
    },
    getAllReferenceTypes: function(){
        return SystemParameters.ReferenceType;
    },

    loadLookupData: function(){
    }
};