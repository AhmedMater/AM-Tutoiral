/**
 * Created by Ahmed Mater on 10/22/2016.
 */
module.exports = {

    SERVICES: "Services",
    REPOSITORY: "Repository",
    MAIN: "Main",
    COMMON: "Common",
    Logger: "Logger",

    SERVER_ERROR: "Server Error",
    DATABASE_ERROR: "Database Error",
    FRONTEND_ERROR: "Front-End Error",
    AUTHORIZATION_ERROR: "Authorization Error",

    SECRET_WORD: 'Ahmed Mater',
    LogFilePath: 'C:\\AMPro\\log.txt',
    AM_SYSTEM: "AM-Logger",
    datePattern: "yyyy-mm-dd HH:MM:ss",

    DB_INFO : {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'am'
    },

    UserRole:{
        USER: 'User',
        ADMIN: 'Admin'
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
        name: /^[A-Za-z ]+$/,

        names: /^[A-Za-z0-9 -\/]{5,70}$/,
        description: /^[A-Za-z0-9 -\/]{0,200}$/,
        numbers: /[0-9]+/,
        youTubePlayList: /^http:\/\/(?:www\.)?youtube\.com\/watch\?(?:&.*)*((?:v=([a-zA-Z0-9_\-]{11})(?:&.*)*)|(?:list=([a-zA-Z0-9_\-]{18})(?:&.*)*&v=([a-zA-Z0-9_\-]{11})))(?:&.*)*(?:\#.*)*$/,
        url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    }

};