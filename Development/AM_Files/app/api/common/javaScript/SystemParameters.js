/**
 * Created by Ahmed Mater on 10/22/2016.
 */
module.exports = {
    SECRET_WORD: 'Ahmed Mater',
    LogFilePath: 'C:\\AMPro\\log.txt',
    AM_SYSTEM: "AM-Logger",
    datePattern: "yyyy-mm-dd HH:MM:ss",

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

};