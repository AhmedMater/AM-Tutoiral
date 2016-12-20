
var Valid = rootRequire('Validation');
var UserRepository = rootRequire('UserRepository');

var async = require('async');
var lookupRepository = rootRequire('LookupRepository');

var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');

// Validation Test Functions
var testingTitleValidation = function(){
    var title1 = "This is a Good Title";
    var title2 = "aaaaaaaaaaaa 0 9 4 aaaaaaaaasdasdasdasdasdasdasd asdasdasdadasdasdasdasdasdasd asdasdasdadasdasdasdasdasdasd asdasdasdadasdasdasdasdasdasd asdasdasdaaaaaaaaaaaaasdasdasdasdasdasdasdasdaaaaaaaaaaaaaThis is More than 50 Char";
    var title3 = "Has no Char + $ @ $";
    var title4 = "as";

    return [
        {num: 1, value: "null", mandatory:true, error: Valid.title(null, true, "Course Name")},
        {num: 2, value: "Empty", mandatory:true, error: Valid.title("", true, "Course Name")},
        {num: 3, value: title1, mandatory:true, error: Valid.title(title1, true, "Course Name")},
        {num: 4, value: title2, mandatory:true, error: Valid.title(title2, true, "Course Name")},
        {num: 5, value: title3, mandatory:true, error: Valid.title(title3, true, "Course Name")},
        {num: 6, value: title4, mandatory:true, error: Valid.title(title4, true, "Course Name")},
        {num: 7, value: "null", mandatory:false, error: Valid.title(null, false, "Course Name")},
        {num: 8, value: "Empty", mandatory:false, error: Valid.title("", false, "Course Name")},
        {num: 9, value: title1, mandatory:false, error: Valid.title(title1, false, "Course Name")},
        {num: 10, value: title2, mandatory:false, error: Valid.title(title2, false, "Course Name")},
        {num: 11, value: title3, mandatory:false, error: Valid.title(title3, false, "Course Name")},
        {num: 12, value: title4, mandatory:false, error: Valid.title(title4, false, "Course Name")}
    ];

};
var testingPositiveNumValidation = function(){
    var num1 = "sadasd";
    var num2 = "-1";
    var num3 = "5";

    return [
        {num: 1, value: "null",  mandatory:true,  error: Valid.positiveNum(null, true, "Course Level")},
        {num: 2, value: "Empty", mandatory:true,  error: Valid.positiveNum("", true, "Course Level")},
        {num: 3, value: num1,    mandatory:true,  error: Valid.positiveNum(num1, true, "Course Level")},
        {num: 4, value: num2,    mandatory:true,  error: Valid.positiveNum(num2, true, "Course Level")},
        {num: 5, value: num3,    mandatory:true,  error: Valid.positiveNum(num3, true, "Course Level")},
        {num: 6, value: "null",  mandatory:false, error: Valid.positiveNum(null, false, "Course Level")},
        {num: 7, value: "Empty", mandatory:false, error: Valid.positiveNum("", false, "Course Level")},
        {num: 8, value: num1,    mandatory:false, error: Valid.positiveNum(num1, false, "Course Level")},
        {num: 9, value: num2,    mandatory:false, error: Valid.positiveNum(num2, false, "Course Level")},
        {num: 10, value: num3,   mandatory:false, error: Valid.positiveNum(num3, false, "Course Level")}
    ];
};
var testingNumberValidation = function(){
    var num1 = "sadasd";
    var num2 = "-1";
    var num3 = "5";

    return [
        {num: 1, value: "null",  mandatory:true,  error: Valid.number(null, true, "Course Type")},
        {num: 2, value: "Empty", mandatory:true,  error: Valid.number("", true, "Course Type")},
        {num: 3, value: num1,    mandatory:true,  error: Valid.number(num1, true, "Course Type")},
        {num: 4, value: num2,    mandatory:true,  error: Valid.number(num2, true, "Course Type")},
        {num: 5, value: num3,    mandatory:true,  error: Valid.number(num3, true, "Course Type")},
        {num: 6, value: "null",  mandatory:false, error: Valid.number(null, false, "Course Type")},
        {num: 7, value: "Empty", mandatory:false, error: Valid.number("", false, "Course Type")},
        {num: 8, value: num1,    mandatory:false, error: Valid.number(num1, false, "Course Type")},
        {num: 9, value: num2,    mandatory:false, error: Valid.number(num2, false, "Course Type")},
        {num: 10, value: num3,   mandatory:false, error: Valid.number(num3, false, "Course Type")}
    ];
};
var testingYoutubePlaylistValidation = function(){
    var youTubePlaylist1 = "https://www.youtube.com/watch?v=qj3qPrmhIXs";
    var youTubePlaylist2 = "https://www.youtube.com/watch?v=IcYZOizikwA&list=RDIcYZOizikwA";
    var youTubePlaylist3 = "https://www.youtube.com/playlist?list=PLqItuIAASZlNc3tcI7-a7VupWm1h2nEXl";
    var youTubePlaylist4 = "asdasd123123";

    return [
        {num: 1, value: "null", mandatory:true, error: Valid.youTubePlaylist(null, true, "Course Name")},
        {num: 2, value: "Empty", mandatory:true, error: Valid.youTubePlaylist("", true, "Course Name")},
        {num: 3, value: youTubePlaylist1, mandatory:true, error: Valid.youTubePlaylist(youTubePlaylist1, true, "Course Name")},
        {num: 4, value: youTubePlaylist2, mandatory:true, error: Valid.youTubePlaylist(youTubePlaylist2, true, "Course Name")},
        {num: 5, value: youTubePlaylist3, mandatory:true, error: Valid.youTubePlaylist(youTubePlaylist3, true, "Course Name")},
        {num: 6, value: youTubePlaylist4, mandatory:true, error: Valid.youTubePlaylist(youTubePlaylist4, true, "Course Name")},
        {num: 7, value: "null", mandatory:false, error: Valid.youTubePlaylist(null, false, "Course Name")},
        {num: 8, value: "Empty", mandatory:false, error: Valid.youTubePlaylist("", false, "Course Name")},
        {num: 9, value: youTubePlaylist1, mandatory:false, error: Valid.youTubePlaylist(youTubePlaylist1, false, "Course Name")},
        {num: 10, value: youTubePlaylist2, mandatory:false, error: Valid.youTubePlaylist(youTubePlaylist2, false, "Course Name")},
        {num: 11, value: youTubePlaylist3, mandatory:false, error: Valid.youTubePlaylist(youTubePlaylist3, false, "Course Name")},
        {num: 12, value: youTubePlaylist4, mandatory:false, error: Valid.youTubePlaylist(youTubePlaylist4, false, "Course Name")}
    ];
};
var testingDescriptionValidation = function(){
    var description1 = "youtube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtube" +
        "youtube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube" +
        "youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube " +
        "youtube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube" +
        "youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube " +
        "youtube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube" +
        "youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube " +
        "youtube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube" +
        "youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube " +
        "youtube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube" +
        "youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube " +
        "youtube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube" +
        "youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube " +
        "youtube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube" +
        "youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube " +
        "youtube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube" +
        "youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube " +
        "youtube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube" +
        "youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube " +
        "youtube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube" +
        "youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube " +
        "youtube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube" +
        "youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube " +
        "youtube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube" +
        "youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube " +
        "youtube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube" +
        "youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube " +
        "youtube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube" +
        "youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube " +
        "youtube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube" +
        "youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube youtube youtubeyoutube " +
        "youtube youtube";
    var description2 = "asd123123";
    var description3 = "asd12:123 as?d123^123 asd^%12;3^123 asd#$123'^123 as3123";
    var description4 = "asd123123 asd123123 asd123123 asd123123 asd123123 asd123123";
    console.log("Length: " + description1.length);

    return [
        {num: 1, value: "null",          mandatory:true,  error: Valid.description(null, true, "Course Description")},
        {num: 2, value: "Empty",         mandatory:true,  error: Valid.description("", true, "Course Description")},
        {num: 3, value: description1,    mandatory:true,  error: Valid.description(description1, true, "Course Description")},
        {num: 4, value: description2,    mandatory:true,  error: Valid.description(description2, true, "Course Description")},
        {num: 5, value: description3,    mandatory:true,  error: Valid.description(description3, true, "Course Description")},
        {num: 6, value: description4,    mandatory:true,  error: Valid.description(description4, true, "Course Description")},
        {num: 7, value: "null",          mandatory:false, error: Valid.description(null, false, "Course Description")},
        {num: 8, value: "Empty",         mandatory:false, error: Valid.description("", false, "Course Description")},
        {num: 9, value: description1,    mandatory:false, error: Valid.description(description1, false, "Course Description")},
        {num: 10, value: description2,    mandatory:false, error: Valid.description(description2, false, "Course Description")},
        {num: 11, value: description3,    mandatory:false, error: Valid.description(description3, false, "Course Description")},
        {num: 12, value: description4,   mandatory:false, error: Valid.description(description4, false, "Course Description")}
    ];
};
var testingURLValidation = function(){
    var url1 = "https://www.youtube.com/watch?v=qj3qPrmhIXs";
    var url2 = "https://www.youtube.com/watch?v=IcYZOizikwA&list=RDIcYZOizikwA";
    var url3 = "https://www.amazon.com/Java-Complete-Reference-Herbert-Schildt/dp/0071808558";
    var url4 = "https://www.safaribooksonline.com/library/view/java-the-complete/9780071808552/";
    var url5 = "https://www.coursera.org/learn/embedded-operating-system";
    var url6 = "asdasdasdasdasdasdasdasd";

    return [
        {num: 1, value: "null", mandatory:true, error: Valid.url(null, true, "Course URL")},
        {num: 2, value: "Empty", mandatory:true, error: Valid.url("", true, "Course URL")},
        {num: 3, value: url1, mandatory:true, error: Valid.url(url1, true, "Course URL")},
        {num: 4, value: url2, mandatory:true, error: Valid.url(url2, true, "Course URL")},
        {num: 5, value: url3, mandatory:true, error: Valid.url(url3, true, "Course URL")},
        {num: 6, value: url4, mandatory:true, error: Valid.url(url4, true, "Course URL")},
        {num: 7, value: url5, mandatory:true, error: Valid.url(url5, true, "Course URL")},
        {num: 8, value: url6, mandatory:true, error: Valid.url(url6, true, "Course URL")},
        {num: 9, value: "null", mandatory:false, error: Valid.url(null, false, "Course URL")},
        {num: 10, value: "Empty", mandatory:false, error: Valid.url("", false, "Course URL")},
        {num: 11, value: url1, mandatory:false, error: Valid.url(url1, false, "Course URL")},
        {num: 12, value: url2, mandatory:false, error: Valid.url(url2, false, "Course URL")},
        {num: 13, value: url3, mandatory:false, error: Valid.url(url3, false, "Course URL")},
        {num: 14, value: url4, mandatory:false, error: Valid.url(url4, false, "Course URL")},
        {num: 15, value: url5, mandatory:false, error: Valid.url(url5, false, "Course URL")},
        {num: 16, value: url6, mandatory:false, error: Valid.url(url6, false, "Course URL")}
    ];

};
var testingUserNameValidation = function(){

    var userName1 = "Ahmed_Mater";
    var userName2 = "12Ahmed";
    var userName3 = "Ahmed Mater";
    var userName4 = "Ahmed-Mater";
    var userName5 = "Ahmed.Mater";
    var userName6 = "Ahmed$Mater";
    var userName7 = "_2Ahmed";
    var userName8 = "-Ahmed1";
    var userName9 = ".Ahmed12";
    var userName10 = "sd";
    var userName11 = "asdasdasdassdasdassdasdassdasdassdasdassdasdassdasdassdasdasdasdasd";

    return [
        {num: 1,  value: "null",        mandatory:true,     error: Valid.userName(null, true)},
        {num: 2,  value: "Empty",       mandatory:true,     error: Valid.userName("", true)},
        {num: 3,  value: userName1,     mandatory:true,     error: Valid.userName(userName1, true)},
        {num: 4,  value: userName2,     mandatory:true,     error: Valid.userName(userName2, true)},
        {num: 5,  value: userName3,     mandatory:true,     error: Valid.userName(userName3, true)},
        {num: 6,  value: userName4,     mandatory:true,     error: Valid.userName(userName4, true)},
        {num: 7,  value: userName5,     mandatory:true,     error: Valid.userName(userName5, true)},
        {num: 8,  value: userName6,     mandatory:true,     error: Valid.userName(userName6, true)},
        {num: 9,  value: userName7,     mandatory:true,     error: Valid.userName(userName7, true)},
        {num: 10, value: userName8,     mandatory:true,     error: Valid.userName(userName8, true)},
        {num: 11, value: userName9,     mandatory:true,     error: Valid.userName(userName9, true)},
        {num: 12, value: userName10,    mandatory:true,     error: Valid.userName(userName10, true)},
        {num: 13, value: userName11,    mandatory:true,     error: Valid.userName(userName11, true)},
        {num: 14, value: "null",        mandatory:false,    error: Valid.userName(null, false)},
        {num: 15, value: "Empty",       mandatory:false,    error: Valid.userName("", false)},
        {num: 16, value: userName1,     mandatory:false,    error: Valid.userName(userName1, false)},
        {num: 17, value: userName2,     mandatory:false,    error: Valid.userName(userName2, false)},
        {num: 18, value: userName3,     mandatory:false,    error: Valid.userName(userName3, false)},
        {num: 19, value: userName4,     mandatory:false,    error: Valid.userName(userName4, false)},
        {num: 20, value: userName5,     mandatory:false,    error: Valid.userName(userName5, false)},
        {num: 21, value: userName6,     mandatory:false,    error: Valid.userName(userName6, false)},
        {num: 22, value: userName7,     mandatory:false,    error: Valid.userName(userName7, false)},
        {num: 23, value: userName8,     mandatory:false,    error: Valid.userName(userName8, false)},
        {num: 24, value: userName9,     mandatory:false,    error: Valid.userName(userName9, false)},
        {num: 25, value: userName10,    mandatory:false,    error: Valid.userName(userName10, false)},
        {num: 26, value: userName11,    mandatory:false,    error: Valid.userName(userName11, false)}
    ];

};
var testingPasswordValidation = function(){

    var password1 = "Ahmed_Mater";
    var password2 = "12Ahmed";
    var password3 = "Ahmed Mater";
    var password4 = "Aed-Mat/e$%^&@#~r";
    var password5 = "asdasdasdassdasdassdasdassdasdassdasdassdasdassdasdassdasdasdasdasd";
    var password6 = "sd";

    return [
        {num: 1,  value: "null",        mandatory:true,     error: Valid.password(null, true)},
        {num: 2,  value: "Empty",       mandatory:true,     error: Valid.password("", true)},
        {num: 3,  value: password1,     mandatory:true,     error: Valid.password(password1, true)},
        {num: 4,  value: password2,     mandatory:true,     error: Valid.password(password2, true)},
        {num: 5,  value: password3,     mandatory:true,     error: Valid.password(password3, true)},
        {num: 6,  value: password4,     mandatory:true,     error: Valid.password(password4, true)},
        {num: 7,  value: password5,     mandatory:true,     error: Valid.password(password5, true)},
        {num: 8,  value: password6,     mandatory:true,     error: Valid.password(password6, true)},
        {num: 9, value: "null",         mandatory:false,    error: Valid.password(null, false)},
        {num: 10, value: "Empty",       mandatory:false,    error: Valid.password("", false)},
        {num: 11, value: password1,     mandatory:false,    error: Valid.password(password1, false)},
        {num: 12, value: password2,     mandatory:false,    error: Valid.password(password2, false)},
        {num: 13, value: password3,     mandatory:false,    error: Valid.password(password3, false)},
        {num: 14, value: password4,     mandatory:false,    error: Valid.password(password4, false)},
        {num: 15, value: password5,     mandatory:false,    error: Valid.password(password5, false)},
        {num: 16, value: password6,     mandatory:false,    error: Valid.password(password6, false)}
    ];

};
var testingDateValidation = function(){

    var dateOfBirth1 = { day: null, month: null, year: null };
    var dateOfBirth2 = { day: "", month: "", year: "" };
    var dateOfBirth3 = { day: 32, month: null, year: null };
    var dateOfBirth4 = { day: -1, month: null, year: null };
    var dateOfBirth5 = { day: 11, month: null, year: null };
    var dateOfBirth6 = { day: 2, month: null, year: null };
    var dateOfBirth7 = { day: 02, month: null, year: null };

    var dateOfBirth8 = { day: 11, month: null, year: null };
    var dateOfBirth9 = { day: 11, month: "", year: null };
    var dateOfBirth10 = { day: 11, month: -1, year: null };
    var dateOfBirth11 = { day: 11, month: 15, year: null };
    var dateOfBirth12 = { day: 11, month: 5, year: null };
    var dateOfBirth13 = { day: 11, month: 05, year: null };

    var dateOfBirth14 = { day: 11, month: 07, year: null };
    var dateOfBirth15 = { day: 11, month: 12, year: "" };
    var dateOfBirth16 = { day: 1, month: 12, year: 1699 };
    var dateOfBirth17 = { day: 1, month: 12, year: 2900 };
    var dateOfBirth18 = { day: 1, month: 12, year: 1700 };
    var dateOfBirth19 = { day: 01, month: 12, year: 2016 };
    var dateOfBirth20 = { day: 10, month: 12, year: 2017 };

    var dateOfBirth21 = { day: 31, month: 12, year: 2016 };
    var dateOfBirth22 = { day: 30, month: 2, year: 2016 };
    var dateOfBirth23 = { day: 31, month: 11, year: 2016 };

    return [
        {num: 1,  value: "null",            mandatory:true,     error: Valid.date(null, true, "Birth Day")},
        {num: 2,  value: "Empty",           mandatory:true,     error: Valid.date("", true, "Birth Day")},
        {num: 3,  value: dateOfBirth1,      mandatory:true,     error: Valid.date(dateOfBirth1, true, "Birth Day")},
        {num: 4,  value: dateOfBirth2,      mandatory:true,     error: Valid.date(dateOfBirth2, true, "Birth Day")},
        {num: 5,  value: dateOfBirth3,      mandatory:true,     error: Valid.date(dateOfBirth3, true, "Birth Day")},
        {num: 6,  value: dateOfBirth4,      mandatory:true,     error: Valid.date(dateOfBirth4, true, "Birth Day")},
        {num: 7,  value: dateOfBirth5,      mandatory:true,     error: Valid.date(dateOfBirth5, true, "Birth Day")},
        {num: 8,  value: dateOfBirth6,      mandatory:true,     error: Valid.date(dateOfBirth6, true, "Birth Day")},
        {num: 9,  value: dateOfBirth7,      mandatory:true,     error: Valid.date(dateOfBirth7, true, "Birth Day")},
        {num: 10, value: dateOfBirth8,      mandatory:true,     error: Valid.date(dateOfBirth8, true, "Birth Day")},
        {num: 11, value: dateOfBirth9,      mandatory:true,     error: Valid.date(dateOfBirth9, true, "Birth Day")},
        {num: 12, value: dateOfBirth10,     mandatory:true,     error: Valid.date(dateOfBirth10, true, "Birth Day")},
        {num: 13, value: dateOfBirth11,     mandatory:true,     error: Valid.date(dateOfBirth11, true, "Birth Day")},
        {num: 14, value: dateOfBirth12,     mandatory:true,     error: Valid.date(dateOfBirth12, true, "Birth Day")},
        {num: 15, value: dateOfBirth13,     mandatory:true,     error: Valid.date(dateOfBirth13, true, "Birth Day")},
        {num: 16, value: dateOfBirth14,     mandatory:true,     error: Valid.date(dateOfBirth14, true, "Birth Day")},
        {num: 17,  value: dateOfBirth15,    mandatory:true,     error: Valid.date(dateOfBirth15, true, "Birth Day")},
        {num: 18,  value: dateOfBirth16,    mandatory:true,     error: Valid.date(dateOfBirth16, true, "Birth Day", false)},
        {num: 19,  value: dateOfBirth17,    mandatory:true,     error: Valid.date(dateOfBirth17, true, "Birth Day", false)},
        {num: 20, value: dateOfBirth18,     mandatory:true,     error: Valid.date(dateOfBirth18, true, "Birth Day", false)},
        {num: 21, value: dateOfBirth19,     mandatory:true,     error: Valid.date(dateOfBirth19, true, "Birth Day", false)},
        {num: 22,  value: dateOfBirth20,    mandatory:true,     error: Valid.date(dateOfBirth20, true, "Birth Day", true)},
        {num: 23,  value: dateOfBirth21,    mandatory:true,     error: Valid.date(dateOfBirth21, true, "Birth Day", false)},
        {num: 24,  value: dateOfBirth22,    mandatory:true,     error: Valid.date(dateOfBirth22, true, "Birth Day", false)},
        {num: 25,  value: dateOfBirth23,    mandatory:true,     error: Valid.date(dateOfBirth23, true, "Birth Day", false)},
        {num: 26, value: "null",            mandatory:false,    error: Valid.date(null, false, "Birth Day")},
        {num: 27, value: "Empty",           mandatory:false,    error: Valid.date("", false, "Birth Day")},
        {num: 28, value: dateOfBirth1,      mandatory:true,     error: Valid.date(dateOfBirth1, false, "Birth Day")},
        {num: 29, value: dateOfBirth2,      mandatory:true,     error: Valid.date(dateOfBirth2, false, "Birth Day")},
        {num: 30, value: dateOfBirth3,      mandatory:true,     error: Valid.date(dateOfBirth3, false, "Birth Day")},
        {num: 31, value: dateOfBirth4,      mandatory:true,     error: Valid.date(dateOfBirth4, false, "Birth Day")},
        {num: 32, value: dateOfBirth5,      mandatory:true,     error: Valid.date(dateOfBirth5, false, "Birth Day")},
        {num: 33, value: dateOfBirth6,      mandatory:true,     error: Valid.date(dateOfBirth6, false, "Birth Day")},
        {num: 34, value: dateOfBirth7,      mandatory:true,     error: Valid.date(dateOfBirth7, false, "Birth Day")},
        {num: 35, value: dateOfBirth8,      mandatory:true,     error: Valid.date(dateOfBirth8, false, "Birth Day")},
        {num: 36, value: dateOfBirth9,      mandatory:true,     error: Valid.date(dateOfBirth9, false, "Birth Day")},
        {num: 37, value: dateOfBirth10,     mandatory:true,     error: Valid.date(dateOfBirth10, false, "Birth Day")},
        {num: 38, value: dateOfBirth11,     mandatory:true,     error: Valid.date(dateOfBirth11, false, "Birth Day")},
        {num: 39, value: dateOfBirth12,     mandatory:true,     error: Valid.date(dateOfBirth11, false, "Birth Day")},
        {num: 40, value: dateOfBirth13,     mandatory:true,     error: Valid.date(dateOfBirth11, false, "Birth Day")},
        {num: 41, value: dateOfBirth14,     mandatory:true,     error: Valid.date(dateOfBirth11, false, "Birth Day")},
        {num: 42, value: dateOfBirth15,     mandatory:true,     error: Valid.date(dateOfBirth15, false, "Birth Day")},
        {num: 43, value: dateOfBirth16,     mandatory:true,     error: Valid.date(dateOfBirth16, false, "Birth Day", false)},
        {num: 44, value: dateOfBirth17,     mandatory:true,     error: Valid.date(dateOfBirth17, false, "Birth Day", false)},
        {num: 45, value: dateOfBirth18,     mandatory:true,     error: Valid.date(dateOfBirth18, false, "Birth Day", false)},
        {num: 46, value: dateOfBirth19,     mandatory:true,     error: Valid.date(dateOfBirth19, false, "Birth Day", false)},
        {num: 47, value: dateOfBirth20,     mandatory:true,     error: Valid.date(dateOfBirth20, false, "Birth Day", true)},
        {num: 48, value: dateOfBirth21,     mandatory:true,     error: Valid.date(dateOfBirth21, false, "Birth Day", false)},
        {num: 49, value: dateOfBirth22,     mandatory:true,     error: Valid.date(dateOfBirth22, false, "Birth Day", false)},
        {num: 50, value: dateOfBirth23,     mandatory:true,     error: Valid.date(dateOfBirth23, false, "Birth Day", false)}
    ];

};
var testingEmailValidation = function(){
    var email1 = "ahmedmotair@gmail.com";
    var email2 = "ahmed.motair@gizasystems.com";
    var email3 = "KN-NMS@gmail.com";
    var email4 = "Nyongesa@ca.go.ke";
    var email5 = "asdasdasdasdasdasdasdasd";

    return [
        {num: 1, value: "null", mandatory:true, error: Valid.email(null, true)},
        {num: 2, value: "Empty", mandatory:true, error: Valid.email("", true)},
        {num: 3, value: email1, mandatory:true, error: Valid.email(email1, true)},
        {num: 4, value: email2, mandatory:true, error: Valid.email(email2, true)},
        {num: 5, value: email3, mandatory:true, error: Valid.email(email3, true)},
        {num: 6, value: email4, mandatory:true, error: Valid.email(email4, true)},
        {num: 7, value: email5, mandatory:true, error: Valid.email(email5, true)},
        {num: 8, value: "null", mandatory:false, error: Valid.email(null, false)},
        {num: 9, value: "Empty", mandatory:false, error: Valid.email("", false)},
        {num: 10, value: email1, mandatory:false, error: Valid.email(email1, false)},
        {num: 11, value: email2, mandatory:false, error: Valid.email(email2, false)},
        {num: 12, value: email3, mandatory:false, error: Valid.email(email3, false)},
        {num: 13, value: email4, mandatory:false, error: Valid.email(email4, false)},
        {num: 14, value: email5, mandatory:false, error: Valid.email(email5, false)}
    ];

};
var testingNameValidation = function(){
    var name1 = "Ahmed Ali";
    var name2 = "as";
    var name3 = "Aasdasdasdasdasdasdasdasdasdasdasdasded Ali";
    var name4 = "Ahm%@#ed Ali";

    return [
        {num: 1, value: "null", mandatory:true, error: Valid.name(null, true, "First Name")},
        {num: 2, value: "Empty", mandatory:true, error: Valid.name("", true, "First Name")},
        {num: 3, value: name1, mandatory:true, error: Valid.name(name1, true, "First Name")},
        {num: 4, value: name2, mandatory:true, error: Valid.name(name2, true, "First Name")},
        {num: 5, value: name3, mandatory:true, error: Valid.name(name3, true, "First Name")},
        {num: 6, value: name4, mandatory:true, error: Valid.name(name4, true, "First Name")},
        {num: 7, value: "null", mandatory:false, error: Valid.name(null, false, "First Name")},
        {num: 8, value: "Empty", mandatory:false, error: Valid.name("", false, "First Name")},
        {num: 9, value: name1, mandatory:false, error: Valid.name(name1, false, "First Name")},
        {num: 10, value: name2, mandatory:false, error: Valid.name(name2, false, "First Name")},
        {num: 11, value: name3, mandatory:false, error: Valid.name(name3, false, "First Name")},
        {num: 12, value: name4, mandatory:false, error: Valid.name(name4, false, "First Name")}
    ];

};
var testingGenderValidation = function(){
    var gender1 = "sadasd";
    var gender2 = "F";
    var gender3 = "M";

    return [
        {num: 1, value: "null",  mandatory:true,  error: Valid.gender(null, true)},
        {num: 2, value: "Empty", mandatory:true,  error: Valid.gender("", true)},
        {num: 3, value: gender1,    mandatory:true,  error: Valid.gender(gender1, true)},
        {num: 4, value: gender2,    mandatory:true,  error: Valid.gender(gender2, true)},
        {num: 5, value: gender3,    mandatory:true,  error: Valid.gender(gender3, true)},
        {num: 6, value: "null",  mandatory:false, error: Valid.gender(null, false)},
        {num: 7, value: "Empty", mandatory:false, error: Valid.gender("", false)},
        {num: 8, value: gender1,    mandatory:false, error: Valid.gender(gender1, false)},
        {num: 9, value: gender2,    mandatory:false, error: Valid.gender(gender2, false)},
        {num: 10, value: gender3,   mandatory:false, error: Valid.gender(gender3, false)}
    ];
};
var testingYouTubeValidation = function(){
    var youTube1 = "sadasd";
    var youTube2 = "https://www.youtube.com/watch?v=dfQxpz8af9I";
    var youTube3 = "https://www.amazon.com/Java-Complete-Reference-Herbert-Schildt/dp/0071808558";

    return [
        {num: 1, value: "null",      mandatory:true,  error: Valid.youTube(null, true, "Tutorial Video")},
        {num: 2, value: "Empty",     mandatory:true,  error: Valid.youTube("", true, "Tutorial Video")},
        {num: 3, value: youTube1,    mandatory:true,  error: Valid.youTube(youTube1, true, "Tutorial Video")},
        {num: 4, value: youTube2,    mandatory:true,  error: Valid.youTube(youTube2, true, "Tutorial Video")},
        {num: 5, value: youTube3,    mandatory:true,  error: Valid.youTube(youTube3, true, "Tutorial Video")},
        {num: 6, value: "null",      mandatory:false, error: Valid.youTube(null, false, "Tutorial Video")},
        {num: 7, value: "Empty",     mandatory:false, error: Valid.youTube("", false, "Tutorial Video")},
        {num: 8, value: youTube1,    mandatory:false, error: Valid.youTube(youTube1, false, "Tutorial Video")},
        {num: 9, value: youTube2,    mandatory:false, error: Valid.youTube(youTube2, false, "Tutorial Video")},
        {num: 10, value: youTube3,   mandatory:false, error: Valid.youTube(youTube3, false, "Tutorial Video")}
    ];
};

var testingValidations = function(res){
    var result = [];

    //result = testingTitleValidation();
    //result = testingPositiveNumValidation();
    //result = testingNumberValidation();
    //result = testingYoutubePlaylistValidation();
    //result = testingDescriptionValidation();
    //result = testingURLValidation();
    //result = testingUserNameValidation();
    //result = testingPasswordValidation();
    //result = testingDateValidation();
    //result = testingEmailValidation();
    //result = testingNameValidation();
    //result = testingGenderValidation();
    //result = testingYouTubeValidation();

    res.render('test', {
        title: 'Test',
        results: result
    });
};

module.exports = {

    go : function(req, res, next) {

        //testingValidations(res);

        var insertUser = function(RepositoryCallback){
            var userData = {
                userName: "Admin1_Test",
                password: "ahmednight",
                confirmPassword: "ahmednight",
                userRoleID: 2,
                firstName: "Ahmed",
                lastName: "Mater",
                email: "ahmedmotair@gmail.com",
                gender: "M",
                dateOfBirth: {
                    day: "15",
                    month: "5",
                    year: "1993"
                },
                mailSubscribe: false
            };
            UserRepository.insertUser(userData, RepositoryCallback);
        };
        var selectUserID = function(RepositoryCallback) {
            //UserRepository.selectUserByID(1, RepositoryCallback);
            UserRepository.selectUserByID(25, RepositoryCallback);
        };
        var login = function(RepositoryCallback) {
            //UserRepository.selectUserByLoginData('Admin_Test1','ahmednight', RepositoryCallback);
            //UserRepository.selectUserByLoginData('Admin_Test1','ahmednighta', RepositoryCallback);
            UserRepository.selectUserByLoginData('Admin_Test1','ahmedniaghta', RepositoryCallback);
        };
        var getAll = function(RepositoryCallback) {
            UserRepository.selectAllUsers(RepositoryCallback);
        };
        var deleteUser = function(RepositoryCallback){
            UserRepository.deleteUserByID(20, RepositoryCallback);
        };
        var updateUser = function(RepositoryCallback){
            var newUserData = {
                password: "2016",
                userRoleID: 1,
                firstName: "Ajlsdjaskdasd",
                lastName: "asndansdkasnd",
                dateOfBirth:{
                    day: 5,
                    month: 10,
                    year: 2000
                }
            };
            UserRepository.updateUserByID(1, newUserData, RepositoryCallback);
        };
        var isUserFound = function(RepositoryCallback){
            UserRepository.isUserFound("Ahmed_Mater12", null, RepositoryCallback);
            //UserRepository.isUserFound(null, "ahmedmotair@gmail.com", RepositoryCallback);
            //UserRepository.isUserFound("Ahmed_Mater", "ahmedmotair@gmail.cossm", RepositoryCallback);
        };
        var isUserActive = function(RepositoryCallback){
            //UserRepository.isUserActive(1, RepositoryCallback);
            //UserRepository.isUserActive(2, RepositoryCallback);
            UserRepository.isUserActive(1, RepositoryCallback);
        };

        async.waterfall([isUserActive],
            function(err, result) {
                if(err != null)
                    res.send(err.message);
                else if(typeof result === "object")
                    res.send(result);
                else
                    res.send('<h2>' + result + '</h2>');
            }
        );
    }
};