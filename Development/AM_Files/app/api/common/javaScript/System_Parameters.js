/**
 * Created by Ahmed Mater on 10/22/2016.
 */
var exports = module.exports = {
    LookupNames:[
        'User Role', 'Course Level', 'Course Type', 'Reference Type'
    ],

    UserRole:{
        typeID: 1,
        name: {
            USER: 'User',
            ADMIN: 'Admin'
        }
    },
    ForgetPassword:{
        SUCCESS: 'Success',
        FAIL: 'Fail'
    },
    CourseLevel: [
        {name: 'Beginner', value: 'B' },
        {name: 'Medium', value: 'M' },
        {name: 'Advanced', value: 'A' }
    ],
    CourseType: [
        {name: 'Academic', value: 'A' },
        {name: 'Practical', value: 'P' }
    ],
    ReferenceType: [
        {name: 'Book', value: 'B' },
        {name: 'Course', value: 'C' }
    ],

    RegularExpression: {
        userName: /^[A-Za-z0-9\_\.\-]+$/,
        password: /^[A-Za-z0-9]{5,20}$/,
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        gender: /^(M|F)/,
        day_month: /^[0-9]{2}$/,
        year: /^[0-9]{4}$/,
        name: /^[A-Za-z ]+$/
    }


    Routes: {
        "_DBConnection" : "api/repository/_DBConnection",
        "UserRepository" : "api/repository/UserRepository",
        "LookupRepository" : "api/repository/LookupRepository",
        "CourseRepository" : "api/repository/CourseRepository",
        "ArticleRepository" : "api/repository/ArticleRepository",
        "QuestionRepository" : "api/repository/QuestionRepository",
        "UserServices" : "api/repository/UserServices",
        "CourseServices" : "api/repository/CourseServices",
        "ArticleServices" : "api/repository/ArticleServices",
        "QuestionServices" : "api/repository/QuestionServices",
        "ErrorMessages" : "api/common/javaScript/ErrorMessages",
        "Security" : "api/common/javaScript/Security",
        "SHA256" : "api/common/javaScript/SHA256",
        "SystemParameters" : "api/common/javaScript/SystemParameters",
        "Logger" : "api/common/javaScript/Logger",

        "addNewCourse_get" : "main/admin/course/addNewCourse/addNewCourse_get",
        "addNewCourse_post" : "main/admin/course/addNewCourse/addNewCourse_post",
        "addNewChapter_get" : "main/admin/course/addNewChapter/addNewChapter_get",
        "addNewChapter_post" : "main/admin/course/addNewChapter/addNewChapter_post",
        "addNewLesson_get" : "main/admin/course/addNewLesson/addNewLesson_get",
        "addNewLesson_post" : "main/admin/course/addNewLesson/addNewLesson_post",
        "addNewArticle_get" : "main/admin/article/addNewArticle/addNewArticle_get",
        "addNewArticle_post" : "main/admin/article/addNewArticle/addNewArticle_post",

        "forgetPassword_get" : "main/components/forgetPassword/forgetPassword_get",
        "forgetPassword_post" : "main/components/forgetPassword/forgetPassword_post",
        "login_get" : "main/components/login/login_get",
        "login_post" : "main/components/login/login_post",
        "register_get" : "main/components/register/register_get",
        "register_post" : "main/components/register/register_post",
        "home_get" : "main/home/home_get",
        "home_post" : "main/home/home_post"
    }
};