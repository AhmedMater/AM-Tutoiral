/**
 * Created by Ahmed Mater on 10/22/2016.
 */


var FOLDERS_NAMES = {

        // Main two Folders
    api: "api",
    main: "main",

        // API Folders
    services: "services",
    repository: "repository",
    common: "common",

        // Common Folders
    javaScript: "javaScript",

        // Main Folders
    admin: "admin",
    components: "components",
    mainCourse: "course",
    user: "user",
    home: "home",

        // Admin Folders
    adminCourse: "course",
    addNewCourse: "addNewCourse",
    addNewChapter: "addNewChapter",
    addNewLesson: "addNewLesson",

        // Components Folders
    login: "login",
    register: "register",
    forgetPassword: "forgetPassword",

        // Main Course Folders
    allCourses: "allCourses",
    allChapters: "allChapters",
    allLessons: "allLessons",
    courseDetails: "courseDetails",
    chapterDetails: "chapterDetails",
    lessonDetails: "lessonDetails",


};

var SUB_FOLDERS = {
    services: "../" + FOLDERS_NAMES.api + "/" + FOLDERS_NAMES.services,
    repository: "../" + FOLDERS_NAMES.repository,
    javaScript: "../" + FOLDERS_NAMES.common + "/" + FOLDERS_NAMES.javaScript,

    home: FOLDERS_NAMES.main + "/" + FOLDERS_NAMES.home,

        // Components Folders Full Paths
    login: FOLDERS_NAMES.main + "/" + FOLDERS_NAMES.components + "/" + FOLDERS_NAMES.login,
    register: FOLDERS_NAMES.main + "/" + FOLDERS_NAMES.components + "/" + FOLDERS_NAMES.register,
    forgetPassword: FOLDERS_NAMES.main + "/" + FOLDERS_NAMES.components + "/" + FOLDERS_NAMES.forgetPassword,

        // Main Course Folders Full Paths
    allCourses: FOLDERS_NAMES.main + "/" + FOLDERS_NAMES.admin + "/" + FOLDERS_NAMES.mainCourse + "/" +FOLDERS_NAMES.allCourses,
    allChapters: FOLDERS_NAMES.main + "/" + FOLDERS_NAMES.admin + "/" + FOLDERS_NAMES.mainCourse + "/" +FOLDERS_NAMES.allChapters,
    allLessons: FOLDERS_NAMES.main + "/" + FOLDERS_NAMES.admin + "/" + FOLDERS_NAMES.mainCourse + "/" +FOLDERS_NAMES.allLessons,
    courseDetails: FOLDERS_NAMES.main + "/" + FOLDERS_NAMES.admin + "/" + FOLDERS_NAMES.mainCourse + "/" +FOLDERS_NAMES.courseDetails,
    chapterDetails: FOLDERS_NAMES.main + "/" + FOLDERS_NAMES.admin + "/" + FOLDERS_NAMES.mainCourse + "/" +FOLDERS_NAMES.chapterDetails,
    lessonDetails: FOLDERS_NAMES.main + "/" + FOLDERS_NAMES.admin + "/" + FOLDERS_NAMES.mainCourse + "/" +FOLDERS_NAMES.lessonDetails,

        // Admin Folders Full Paths
    addNewCourse: FOLDERS_NAMES.main + "/" + FOLDERS_NAMES.admin + "/" + FOLDERS_NAMES.adminCourse + "/" +FOLDERS_NAMES.addNewCourse,
    addNewChapter: FOLDERS_NAMES.main + "/" + FOLDERS_NAMES.admin + "/" + FOLDERS_NAMES.adminCourse + "/" +FOLDERS_NAMES.addNewChapter,
    addNewLesson: FOLDERS_NAMES.main + "/" + FOLDERS_NAMES.admin + "/" + FOLDERS_NAMES.adminCourse + "/" +FOLDERS_NAMES.addNewLesson
};
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

        // SUB_FOLDERS.services = ../services
    Services:{
        User: SUB_FOLDERS.services + "/User",
        Lookup: SUB_FOLDERS.services + "/Lookup",
        Course: SUB_FOLDERS.services + "/Course"
    },

        // SUB_FOLDERS.repository = ../repository
    Repository:{
        _DBConnection: SUB_FOLDERS.repository + "/_DBConnection",
        User: SUB_FOLDERS.repository + "/User",
        Lookup: SUB_FOLDERS.repository + "/Lookup",
        Course: SUB_FOLDERS.repository + "/Course"
    },

    Common: { // SUB_FOLDERS.javaScript = ../common/javaScript
        Exceptions: SUB_FOLDERS.javaScript + "/Exceptions",
        Logger: SUB_FOLDERS.javaScript + "/Logger",
        SystemParameters: SUB_FOLDERS.javaScript + "/System_Parameters",
        Sha256: SUB_FOLDERS.javaScript + "/Sha256"
    },

    Routes:{
        home_get: SUB_FOLDERS.home + "/home_get",

        login_get: SUB_FOLDERS.login + "/login_get",
        login_post: SUB_FOLDERS.login + "/login_post",

        register_get: SUB_FOLDERS.register + "/register_get",
        register_post: SUB_FOLDERS.register + "/register_post",
        userNameCheck: SUB_FOLDERS.register + "/userNameCheck",

        allCourses_get: SUB_FOLDERS.allCourses + "/allCourses_get",
        allChapters_get: SUB_FOLDERS.allChapters + "/allChapters_get",
        allLessons_get: SUB_FOLDERS.allLessons + "/allLessons_get",

        courseDetails_get: SUB_FOLDERS.courseDetails + "/courseDetails_get",
        chapterDetails_get: SUB_FOLDERS.chapterDetails + "/chapterDetails_get",
        lessonDetails_get: SUB_FOLDERS.lessonDetails + "/lessonDetails_get",

        addNewCourse_get: SUB_FOLDERS.addNewCourse + "/addNewCourse_get",
        addNewCourse_post: SUB_FOLDERS.addNewCourse + "/addNewCourse_post",

        addNewChapter_get: SUB_FOLDERS.addNewChapter + "/addNewChapter_get",
        addNewChapter_post: SUB_FOLDERS.addNewChapter + "/addNewChapter_post",

        addNewLesson_get: SUB_FOLDERS.addNewLesson + "/addNewLesson_get",
        addNewLesson_post: SUB_FOLDERS.addNewLesson + "/addNewLesson_post",
    },

    Views:{
        home: SUB_FOLDERS.home + "/home",
        login: SUB_FOLDERS.login + "/login",
        register_main: SUB_FOLDERS.register + "/register_main",

        allCourses: SUB_FOLDERS.allCourses + "/allCourses",
        allChapters: SUB_FOLDERS.allChapters + "/allChapters",
        allLessons: SUB_FOLDERS.allLessons + "/allLessons",

        courseDetails: SUB_FOLDERS.courseDetails + "/courseDetails",
        chapterDetails: SUB_FOLDERS.chapterDetails + "/chapterDetails",
        lessonDetails: SUB_FOLDERS.lessonDetails + "/lessonDetails",

        addNewCourse: SUB_FOLDERS.addNewCourse + "/addNewCourse",
        addNewChapter: SUB_FOLDERS.addNewChapter + "/addNewChapter",
        addNewLesson: SUB_FOLDERS.addNewLesson + "/addNewLesson"
    },

    FOLDERS_NAMES : FOLDERS_NAMES
};

