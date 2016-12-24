/**
 * Created by Ahmed Mater on 12/24/2016.
 */

var exports = module.exports = {};

exports.setUser = function(row, ModelCallback){
    if(row == null)
        return ModelCallback(null, null);
    else {
        var User = {
            userID: row.userID,
            userName: row.user_name,
            email: row.email,
            userRole: {
                id: row.roleID,
                name: row.roleName,
                value: row.roleValue
            },
            dateOfRegistration: row.date_of_registration,
            firstName: row.first_name,
            lastName: row.last_name,
            gender: (row.gender == 'M') ? 'Male' : 'Female',
            mailSubscribe: row.mail_subscribe,
            university: row.university,
            college: row.college,
            job: row.job,
            country: row.country,
            dateOfBirth: row.date_of_birth,
            mobileNumber: row.mobile_number,
            userPic: row.profile_pic
        };

        return ModelCallback(null, User);
    }
};
exports.setAllUsers = function(rows, ModelCallback){
    if(rows == null)
        return ModelCallback(null, null);
    else {
        var Users = [];

        for(var i=0; i<rows.length; i++)
            Users.push({
                userID: rows[i].userID,
                userRole: rows[i].roleName,
                fullName: rows[i].fullName,
                dateOfRegistration: rows[i].date_of_registration,
                gender: (rows[i].gender == 'M') ? 'Male' : 'Female',
                university: rows[i].university,
                college: rows[i].college,
                job: rows[i].job,
                country: rows[i].country,
                dateOfBirth: rows[i].date_of_birth
            });

        return ModelCallback(null, Users);
    }
};

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
            lastUpdated: row.last_updated,
            youTubePlaylist: row.playlist_link,
            description: row.description,
            addBy: row.fullName
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
                lastUpdated: rows[i].last_updated,
                youTubePlaylist: rows[i].playlist_link,
                description: rows[i].description
            });

        return ModelCallback(null, Courses);
    }
};

exports.setAllContents = function(rows, ModelCallback){
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
exports.setAllObjectives = function(rows, ModelCallback){
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
exports.setAllPrerequisites = function(rows, ModelCallback){
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
exports.setAllReferences = function(rows, ModelCallback){
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