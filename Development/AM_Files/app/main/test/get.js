
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
module.exports = {

    go : function(req, res, next) {

        //var result = testingTitleValidation();
        //var result = testingPositiveNumValidation();
        //var result = testingNumberValidation();
        //var result = testingYoutubePlaylistValidation();
        var result = testingDescriptionValidation();



        //var url1 = "https://www.youtube.com/watch?v=qj3qPrmhIXs";
        //var url2 = "https://www.youtube.com/watch?v=IcYZOizikwA&list=RDIcYZOizikwA";
        //var url3 = "https://www.amazon.com/Java-Complete-Reference-Herbert-Schildt/dp/0071808558";
        //var url4 = "https://www.safaribooksonline.com/library/view/java-the-complete/9780071808552/";
        //var url5 = "https://www.coursera.org/learn/embedded-operating-system";
        //result.push("1: " + Valid.url(null, "URL"));
        //result.push("2: " + Valid.url("asdasd123123", "URL"));
        //result.push("3: " + Valid.url(url1, "URL"));
        //result.push("4: " + Valid.url(url2, "URL"));
        //result.push("5: " + Valid.url(url3, "URL"));
        //result.push("6: " + Valid.url(url4, "URL"));
        //result.push("7: " + Valid.url(url5, "URL"));
        //result.push("13: " + Valid.url("", "URL"));

        //result.push("1: " + Valid.userName(null));
        //result.push("2: " + Valid.userName("Ahmed_Mater"));
        //result.push("3: " + Valid.userName("12Ahmed"));
        //result.push("4: " + Valid.userName("Ahmed Mater"));
        //result.push("5: " + Valid.userName("Ahmed-Mater"));
        //result.push("6: " + Valid.userName("Ahmed.Mater"));
        //result.push("7: " + Valid.userName("Ahmed$Mater"));
        //result.push("8: " + Valid.userName("_2Ahmed"));
        //result.push("9: " + Valid.userName("-Ahmed1"));
        //result.push("10: " + Valid.userName(".Ahmed12"));
        //result.push("11: " + Valid.userName("sd"));
        //result.push("12: " + Valid.userName("asdasdasdassdasdassdasdassdasdassdasdassdasdassdasdassdasdasdasdasd"));
        //result.push("13: " + Valid.userName(""));

        //result.push("1: " + Valid.password(null));
        //result.push("2: " + Valid.password("Ahmed_Mater"));
        //result.push("3: " + Valid.password("12Ahmed"));
        //result.push("4: " + Valid.password("Ahmed Mater"));
        //result.push("5: " + Valid.password("Ahmed-Mate$%^&*@#~r"));
        //result.push("6: " + Valid.password("sd"));
        //result.push("7: " + Valid.password("asdasdasdassdasdassdasdassdasdassdasdassdasdassdasdassdasdasdasdasd"));
        //result.push("8: " + Valid.password(""));

        //var dateOfBirth1 = { day: null, month: null, year: null };
        //var dateOfBirth2 = { day: 11, month: null, year: null };
        //var dateOfBirth3 = { day: 32, month: null, year: null };
        //var dateOfBirth4 = { day: 31, month: null, year: null };
        //var dateOfBirth5 = { day: 1, month: 2, year: null };
        //var dateOfBirth6 = { day: 01, month: 02, year: null };
        //var dateOfBirth7 = { day: 1, month: 13, year: null };
        //var dateOfBirth8 = { day: 1, month: 12, year: null };
        //var dateOfBirth9 = { day: 1, month: 12, year: 1699 };
        //var dateOfBirth10 = { day: 1, month: 12, year: 2900 };
        //var dateOfBirth11 = { day: 1, month: 12, year: 1700 };
        //var dateOfBirth12 = { day: 1, month: 12, year: 2016 };
        //var dateOfBirth13 = { day: 1, month: 12, year: 2017 };
        //var dateOfBirth14 = { day: "", month: "", year: "" };
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