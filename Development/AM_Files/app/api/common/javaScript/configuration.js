/**
 * Created by Ahmed Mater on 10/22/2016.
 */

var exports = module.exports = {

    URL: {
        home: "/",
        login: "/login",
        register: "/register",
        users: '/users?',
        userCheck: '/user/checkUserName?',
        userProfile: '/user/:id/profile',
        userSettings: '/user/:id/settings?',
        logout: '/logout',

            // all Course URLs
        allCourses: '/courses/all/',
        addNewCourse: '/courses/new/',
        course: '/courses/:courseID/',

            // all Chapters URLs
        allChapters: '/chapters/:courseID/all/',
        addNewChapter: '/chapters/:courseID/new/',
        chapter: '/chapters/:courseID/:chapterID/',

            // all Lessons URLs
        allLessons: '/lessons/:courseID/:chapterID/all/',
        addNewLesson: '/lessons/:courseID/:chapterID/new/',
        lesson: '/lessons/:courseID/:chapterID/:lessonID',

        articles: '/articles?',
        questions: '/questions?'
    },

    Routes: {
        "index-routes": "index-routes",

        "UserRepository": "api/repository/UserRepository",
        "LookupRepository": "api/repository/LookupRepository",
        "CourseRepository": "api/repository/CourseRepository",
        "ArticleRepository": "api/repository/ArticleRepository",
        "QuestionRepository": "api/repository/QuestionRepository",

        "UserServices": "api/services/UserServices",
        "LookupServices": "api/services/LookupServices",
        "CourseServices": "api/services/CourseServices",
        "ArticleServices": "api/services/ArticleServices",
        "QuestionServices": "api/services/QuestionServices",

        "ErrorMessages": "api/common/javaScript/ErrorMessages",
        "Security": "api/common/javaScript/Security",
        "SHA256": "api/common/javaScript/SHA256",
        "SystemParameters": "api/common/javaScript/SystemParameters",
        "Logger": "api/common/javaScript/Logger",
        "AM-Database": "api/common/javaScript/_DBConnection",
        "configuration": "api/common/javaScript/configuration",

        "addNewCourse_get": "main/admin/course/addNewCourse/addNewCourse_get",
        "addNewCourse_post": "main/admin/course/addNewCourse/addNewCourse_post",
        "addNewChapter_get": "main/admin/course/addNewChapter/addNewChapter_get",
        "addNewChapter_post": "main/admin/course/addNewChapter/addNewChapter_post",
        "addNewLesson_get": "main/admin/course/addNewLesson/addNewLesson_get",
        "addNewLesson_post": "main/admin/course/addNewLesson/addNewLesson_post",
        "addNewArticle_get": "main/admin/article/addNewArticle/addNewArticle_get",
        "addNewArticle_post": "main/admin/article/addNewArticle/addNewArticle_post",

        "forgetPassword_get": "main/components/forgetPassword/forgetPassword_get",
        "forgetPassword_post": "main/components/forgetPassword/forgetPassword_post",
        "login_get": "main/components/login/login_get",
        "login_post": "main/components/login/login_post",
        "register_get": "main/components/register/register_get",
        "register_post": "main/components/register/register_post",
        "userNameCheck": "main/components/register/userNameCheck",
        "home_get": "main/home/home_get",
        "home_post": "main/home/home_post"
    },

    Views:{
        "error": "api/common/layout/error",

        "home": "main/home/home",

        "addNewCourse": "main/admin/course/addNewCourse/addNewCourse",
        "addInitialChapters": "main/admin/course/addInitialChapters/addInitialChapters",
        "addNewChapter": "main/admin/course/addNewChapter/addNewChapter",

        "forgetPassword_main": "main/components/forgetPassword/forgetPassword_main",
        "forgetPassword_successful": "main/components/forgetPassword/forgetPassword_successful",
        "login": "main/components/login/login",
        "register_main": "main/components/register/register_main",
        "register_successful": "main/components/register/register_successful"
    }
};

