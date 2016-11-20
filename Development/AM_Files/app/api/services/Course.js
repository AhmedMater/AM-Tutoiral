/**
 * Created by Ahmed Mater on 11/20/2016.
 */
var config = require('../../configuration');
var async = require('async');

var CourseRepository = require(config.Repository.Course);
var LookupRepository = require(config.Repository.Lookup);

var Exceptions = require(config.Common.Exceptions);
var SystemParameters = require(config.Common.SystemParameters);
var Logger = require(config.Common.Logger);

var fn_names = {
    getAllCourses: "getAllCourses",
    getCourseByID: "getCourseByID",
    getCourseByName: "getCourseByName"
};

var exports = module.exports = {
    getAllCourses: function(){

    },

    getCourseByID: function(){

    },

    getCourseByName: function () {

    }
};