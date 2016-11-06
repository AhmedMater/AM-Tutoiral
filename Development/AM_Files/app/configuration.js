/**
 * Created by Ahmed Mater on 10/22/2016.
 */


var FOLDERS_NAMES = {

    api: "api",
    service: "service",
    repository: "repository",
    common: "common",
    javaScript: "javaScript",

    main: "main",
    components: "components",
    admin: "admin",
    user: "user"
};

var SUB_FOLDERS = {
    services: "../" + FOLDERS_NAMES.api + "/services",
    repository: "../" + FOLDERS_NAMES.repository,
    javaScript: "../" + FOLDERS_NAMES.common + "/" + FOLDERS_NAMES.javaScript,

    home: FOLDERS_NAMES.main + "/home",
    login: FOLDERS_NAMES.main + "/" + FOLDERS_NAMES.components + "/login",
    register: FOLDERS_NAMES.main + "/" + FOLDERS_NAMES.components + "/register"
};
var exports = module.exports = {

    URL: {
        home: "/",
        login: "/login",
        register: "/register",
        userCheck: '/user/checkUserName?'
    },

    Services:{ // SUB_FOLDERS.services = ../services
        User: SUB_FOLDERS.services + "/User",
        Lookup: SUB_FOLDERS.services + "/Lookup"
    },

    Repository:{ // SUB_FOLDERS.repository = ../repository
        _DBConnection: SUB_FOLDERS.repository + "/_DBConnection",
        User: SUB_FOLDERS.repository + "/User",
        Lookup: SUB_FOLDERS.repository + "/Lookup"
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
        userNameCheck: SUB_FOLDERS.register + "/userNameCheck"
    },

    Views:{
        home: SUB_FOLDERS.home + "/home",
        login: SUB_FOLDERS.login + "/login",
        register_main: SUB_FOLDERS.register + "/register_main",
    },

    FOLDERS_NAMES : FOLDERS_NAMES
};

