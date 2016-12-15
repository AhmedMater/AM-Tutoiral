
var Valid = rootRequire('Validation');

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
    var password4 = "Ahmed-Mate$%^&*@#~r";
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
    var dateOfBirth7 = { day: 02, month: "", year: null };

    var dateOfBirth9 = { day: 1, month: 2, year: null };
    var dateOfBirth10 = { day: 01, month: 02, year: null };
    var dateOfBirth11 = { day: 1, month: 13, year: null };
    var dateOfBirth12 = { day: 1, month: 12, year: null };
    var dateOfBirth9 = { day: 1, month: 12, year: 1699 };
    var dateOfBirth10 = { day: 1, month: 12, year: 2900 };
    var dateOfBirth11 = { day: 1, month: 12, year: 1700 };
    var dateOfBirth12 = { day: 1, month: 12, year: 2016 };
    var dateOfBirth13 = { day: 1, month: 12, year: 2017 };

    return [
        {num: 1,  value: "null",        mandatory:true,     error: Valid.date(null, true, "Birth Day")},
        {num: 2,  value: "Empty",       mandatory:true,     error: Valid.date("", true, "Birth Day")},
        {num: 3,  value: dateOfBirth1,     mandatory:true,     error: Valid.date(dateOfBirth1, true, "Birth Day")},
        {num: 4,  value: dateOfBirth2,     mandatory:true,     error: Valid.date(dateOfBirth2, true, "Birth Day")},
        {num: 5,  value: dateOfBirth3,     mandatory:true,     error: Valid.date(dateOfBirth3, true, "Birth Day")},
        {num: 6,  value: dateOfBirth4,     mandatory:true,     error: Valid.date(dateOfBirth4, true, "Birth Day")},
        {num: 7,  value: dateOfBirth5,     mandatory:true,     error: Valid.date(dateOfBirth5, true, "Birth Day")},
        {num: 8,  value: dateOfBirth6,     mandatory:true,     error: Valid.date(dateOfBirth6, true, "Birth Day")},
        {num: 9,  value: dateOfBirth7,     mandatory:true,     error: Valid.date(dateOfBirth7, true, "Birth Day")},
        {num: 10, value: dateOfBirth8,     mandatory:true,     error: Valid.date(dateOfBirth8, true, "Birth Day")},
        {num: 11, value: dateOfBirth9,     mandatory:true,     error: Valid.date(dateOfBirth9, true, "Birth Day")},
        {num: 12, value: dateOfBirth10,    mandatory:true,     error: Valid.date(dateOfBirth10, true, "Birth Day")},
        {num: 13, value: dateOfBirth11,    mandatory:true,     error: Valid.date(dateOfBirth11, true, "Birth Day")},
        {num: 13, value: dateOfBirth12,    mandatory:true,     error: Valid.date(dateOfBirth11, true, "Birth Day")},
        {num: 13, value: dateOfBirth13,    mandatory:true,     error: Valid.date(dateOfBirth11, true, "Birth Day")},
        {num: 13, value: dateOfBirth14,    mandatory:true,     error: Valid.date(dateOfBirth11, true, "Birth Day")},
        {num: 13, value: dateOfBirth11,    mandatory:true,     error: Valid.date(dateOfBirth11, true, "Birth Day")},
        {num: 14, value: "null",        mandatory:false,    error: Valid.date(null, false, "Birth Day")},
        {num: 15, value: "Empty",       mandatory:false,    error: Valid.date("", false, "Birth Day")},
        {num: 16, value: userName1,     mandatory:false,    error: Valid.date(userName1, false, "Birth Day")},
        {num: 17, value: userName2,     mandatory:false,    error: Valid.date(userName2, false, "Birth Day")},
        {num: 18, value: userName3,     mandatory:false,    error: Valid.date(userName3, false, "Birth Day")},
        {num: 19, value: userName4,     mandatory:false,    error: Valid.date(userName4, false, "Birth Day")},
        {num: 20, value: userName5,     mandatory:false,    error: Valid.date(userName5, false, "Birth Day")},
        {num: 21, value: userName6,     mandatory:false,    error: Valid.date(userName6, false, "Birth Day")},
        {num: 22, value: userName7,     mandatory:false,    error: Valid.date(userName7, false, "Birth Day")},
        {num: 23, value: userName8,     mandatory:false,    error: Valid.date(userName8, false, "Birth Day")},
        {num: 24, value: userName9,     mandatory:false,    error: Valid.date(userName9, false, "Birth Day")},
        {num: 25, value: userName10,    mandatory:false,    error: Valid.date(userName10, false, "Birth Day")},
        {num: 26, value: userName11,    mandatory:false,    error: Valid.date(userName11, false, "Birth Day")}
    ];

};
module.exports = {

    go : function(req, res, next) {

        //var result = testingTitleValidation();
        //var result = testingPositiveNumValidation();
        //var result = testingNumberValidation();
        //var result = testingYoutubePlaylistValidation();
        //var result = testingDescriptionValidation();
        var result = testingURLValidation();
        //var result = testingUserNameValidation();
        //var result = testingPasswordValidation();
        //var result = testingDateValidation();




        //result.push("1: " + Valid.date(null));
        //result.push("2: " + Valid.date(dateOfBirth1));
        //result.push("3: " + Valid.date(dateOfBirth2));
        //result.push("4: " + Valid.date(dateOfBirth3));
        //result.push("5: " + Valid.date(dateOfBirth4));
        //result.push("6: " + Valid.date(dateOfBirth5));
        //result.push("7: " + Valid.date(dateOfBirth6));
        //result.push("8: " + Valid.date(dateOfBirth7));
        //result.push("9: " + Valid.date(dateOfBirth8));
        //result.push("10: " + Valid.date(dateOfBirth9));
        //result.push("11: " + Valid.date(dateOfBirth10));
        //result.push("12: " + Valid.date(dateOfBirth11));
        //result.push("13: " + Valid.date(dateOfBirth12));
        //result.push("14: " + Valid.date(dateOfBirth13));
        //result.push("15: " + Valid.date(dateOfBirth13, true, "Allocation Date"));
        //result.push("16: " + Valid.date(dateOfBirth13, false, "Birth Date"));
        //result.push("17: " + Valid.date(dateOfBirth14, false, "Birth Date"));

        //var email1 = "ahmedmotair@gmail.com";
        //var email2 = "ahmed.motair@gizasystems.com";
        //var email3 = "KN-NMS@gmail.com";
        //var email4 = "Nyongesa@ca.go.ke";
        //result.push("1: " + Valid.email(null));
        //result.push("2: " + Valid.email(email1));
        //result.push("3: " + Valid.email(email2));
        //result.push("4: " + Valid.email(email3));
        //result.push("5: " + Valid.email(email4));
        //result.push("6: " + Valid.email(""));

        //result.push("1: " + Valid.name(null, "First Name"));
        //result.push("2: " + Valid.name("Ahmed Ali", "First Name"));
        //result.push("3: " + Valid.name("as", "First Name"));
        //result.push("4: " + Valid.name("Aasdasdasdasdasdasdasdasdasdasdasdasded Ali", "First Name"));
        //result.push("2: " + Valid.name("Ahm%@#ed Ali", "First Name"));
        //result.push("5: " + Valid.name(""));

        //result.push("1: " + Valid.gender(null));
        //result.push("2: " + Valid.gender(""));
        //result.push("3: " + Valid.gender("Aasdasdasdasdasdasdasdasdasdasdasdasded Ali"));
        //result.push("4: " + Valid.gender("F"));
        //result.push("5: " + Valid.gender("M"));

        res.render('test', {
            title: 'Test',
            res: result
        });
    }
};