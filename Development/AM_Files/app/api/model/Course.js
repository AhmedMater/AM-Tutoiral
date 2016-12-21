/**
 * Created by Ahmed Mater on 12/21/2016.
 */

var exports = module.exports = {};

exports.setCourse = function(row, ModelCallback){
    if(row == null)
        return ModelCallback(null, null);
    else {
        var Course = {
            name: row.courseName,
            period: row.period,
            level: row.courseLevel,
            type: row.courseType,
            dateOfCourse: row.date_of_course,
            lastUpdate: row.last_update,
            youTubePlaylist: row.playlist_link,
            description: row.description
        };

        return ModelCallback(null, Course);
    }
};

exports.setAllCourses = function(rows, ModelCallback){
    if(rows == null)
        return ModelCallback(null, null);
    else {
        var Courses = [];

        for(var i=0; i<rows.length; i++)
            Courses.push({
                name: rows[i].courseName,
                period: rows[i].period,
                level: rows[i].courseLevel,
                type: rows[i].courseType,
                dateOfCourse: rows[i].date_of_course,
                lastUpdate: rows[i].last_update,
                youTubePlaylist: rows[i].playlist_link,
                description: rows[i].description
            });

        return ModelCallback(null, Courses);
    }
};

exports.setAllCourseContents = function(rows, ModelCallback){
    if(rows == null)
        return ModelCallback(null, null);
    else {
        var CourseContents = [];

        for(var i=0; i<rows.length; i++)
            CourseContents.push({
                num: rows[i].num,
                content: rows[i].content
            });

        return ModelCallback(null, CourseContents);
    }
};
exports.setAllCourseObjectives = function(rows, ModelCallback){
    if(rows == null)
        return ModelCallback(null, null);
    else {
        var CourseObjectives = [];

        for(var i=0; i<rows.length; i++)
            CourseObjectives.push({
                num: rows[i].num,
                objective: rows[i].objective
            });

        return ModelCallback(null, CourseObjectives);
    }
};
exports.setAllCoursePrerequisites = function(rows, ModelCallback){
    if(rows == null)
        return ModelCallback(null, null);
    else {
        var CourseObjectives = [];

        for(var i=0; i<rows.length; i++)
            CourseObjectives.push({
                name: rows[i].name,
                url: rows[i].url
            });

        return ModelCallback(null, CourseObjectives);
    }
};
exports.setAllCourseReferences = function(rows, ModelCallback){
    if(rows == null)
        return ModelCallback(null, null);
    else {
        var CourseReferences = [];

        for(var i=0; i<rows.length; i++)
            CourseReferences.push({
                name: rows[i].name,
                type: rows[i].typeName,
                url: rows[i].url
            });

        return ModelCallback(null, CourseReferences);
    }
};