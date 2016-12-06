/**
 * Created by Ahmed Mater on 12/5/2016.
 */
var baseURL = "http://localhost:3002";
var URLs = {
    isUserFound:  baseURL + "/user/isUserFound",
    isCourseFound: baseURL + "/course/isCourseFound?",
    isChapterFound: function(id){ return baseURL + "/chapter/" + id + "/isChapterFound";}
};

//module.exports.URLs = URLs;