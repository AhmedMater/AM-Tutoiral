/**
 * Created by Ahmed Mater on 10/22/2016.
 */

var exports = module.exports = {

    URL: {
        home: "/",
        login: "/login",
        register: "/register",
        users: '/users',
        userProfile: '/user/:id/profile',
        userSettings: '/user/:id/settings?',
        logout: '/logout',

            // admin URLs
        newCourse: '/admin/course/new',
        editCourse: '/admin/course/:courseID/edit',
        removeCourse: '/admin/course/:courseID/remove',

        newChapter: '/admin/chapter/:courseID/new',
        editChapter: '/admin/chapter/:chapterID/edit',
        removeChapter: '/admin/chapter/:chapterID/remove',

        newLesson: '/admin/lesson/:chapterID/new',
        editLesson: '/admin/lesson/:lessonID/edit',
        removeLesson: '/admin/lesson/:lessonID/remove',

        newTask: '/admin/task/:lessonID/new',
        editTask: '/admin/task/:lessonID/edit',
        submitTask: '/admin/task/:lessonID/submit',
        removeTask: '/admin/task/:lessonID/remove',


            // Checks URL
        isUserFound: '/user/isUserFound?userName&email',
        isCourseFound: '/course/isCourseFound?courseName&youTubePlaylist',
        isChapterFound: '/chapter/:courseID/isChapterFound?chapterName'

    },

    Routes: {
        "index-routes": "index-routes",

        "UserRepository": "api/repository/UserRepository",
        "LookupRepository": "api/repository/LookupRepository",
        "CourseRepository": "api/repository/CourseRepository",
        "ChapterRepository": "api/repository/ChapterRepository",
        "LessonRepository": "api/repository/LessonRepository",
        "ArticleRepository": "api/repository/ArticleRepository",
        "QuestionRepository": "api/repository/QuestionRepository",
        "TaskRepository": "api/repository/TaskRepository",

        "UserServices": "api/services/UserServices",
        "LookupServices": "api/services/LookupServices",
        "CourseServices": "api/services/CourseServices",
        "ChapterServices": "api/services/ChapterServices",
        "LessonServices": "api/services/CourseServices",
        "ArticleServices": "api/services/ArticleServices",
        "QuestionServices": "api/services/QuestionServices",
        "TaskServices": "api/services/TaskServices",

        "ErrorMessages": "api/common/javaScript/ErrorMessages",
        "Security": "api/common/javaScript/Security",
        "SHA256": "api/common/javaScript/SHA256",
        "SystemParameters": "api/common/javaScript/SystemParameters",
        "Logger": "api/common/javaScript/Logger",
        "AM-Database": "api/common/javaScript/_DBConnection",
        "configuration": "api/common/javaScript/configuration",

        "home_get": "main/home/get",

        "newCourse_get": "main/admin/course/new/get",
        "newCourse_post": "main/admin/course/new/post",
        "editCourse_get": "main/admin/course/new/get",
        "editCourse_post":"main/admin/course/edit/post",
        "removeCourse": "main/admin/course/remove",
        "isCourseFound": "main/admin/course/isCourseFound",

        "newChapter_get": "main/admin/chapter/new/get",
        "newChapter_post": "main/admin/chapter/new/post",
        "editChapter_get": "main/admin/chapter/new/get",
        "editChapter_post":"main/admin/chapter/edit/post",
        "removeChapter":"main/admin/chapter/remove",
        "isChapterFound": "main/admin/chapter/isChapterFound",

        "newLesson_get": "main/admin/lesson/new/get",
        "newLesson_post": "main/admin/lesson/new/post",
        "editLesson_get": "main/admin/lesson/edit/get",
        "editLesson_post":"main/admin/lesson/edit/post",
        "newTask_get": "main/admin/lesson/task/new/get",
        "newTask_post": "main/admin/lesson/task/new/post",
        "editTask_get": "main/admin/lesson/task/edit/get",
        "editTask_post":"main/admin/lesson/task/edit/post",
        "submitTask_get": "main/admin/lesson/task/submit/get",
        "submitTask_post":"main/admin/lesson/task/submit/post",
        "removeTask":"main/admin/lesson/task/remove",
        "removeLesson":"main/admin/lesson/remove",

        "newArticle_get": "main/admin/article/new/get",
        "newArticle_post": "main/admin/article/new/post",

        "forgetPassword_get": "main/components/forgetPassword/get",
        "forgetPassword_post": "main/components/forgetPassword/post",
        "login_get": "main/components/login/get",
        "login_post": "main/components/login/post",

        "register_get": "main/components/register/get",
        "register_post": "main/components/register/post",
        "isUserFound": "main/components/register/isUserFound"
    },

    Views:{
        "error": "api/common/layout/error",
        "unAuthorized": "api/common/layout/unAuthorized",

        "home": "main/home/view",

        "newCourse_main": "main/admin/course/new/view",
        "newCourse_success": "main/admin/course/new/view_success",
        "editCourse": "main/admin/course/edit/view",

        "newChapter": "main/admin/chapter/new/view",
        "editChapter": "main/admin/chapter/edit/view",

        "newLesson": "main/admin/lesson/new/view",
        "editLesson": "main/admin/lesson/edit/view",
        "newTask": "main/admin/lesson/new/view",
        "editTask": "main/admin/lesson/edit/view",
        "submitTask": "main/admin/lesson/submit/view",

        "forgetPassword_main": "main/components/forgetPassword/view_main",
        "forgetPassword_success": "main/components/forgetPassword/view_success",
        "login_main": "main/components/login/view_main",
        "login_wrong": "main/components/login/view_wrong",
        "register_main": "main/components/register/view_main",
        "register_success": "main/components/register/view_success"
    }
};

