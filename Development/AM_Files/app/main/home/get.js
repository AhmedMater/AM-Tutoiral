
var Valid = rootRequire('Validation');

module.exports = {

    go : function(req, res, next) {
        var title = "aaaaaaaaaaaa 0 9 4 aaaaaaaaasdasdasdasdasdasdasd asdasdasdadasdasdasdasdasdasd asdasdasdadasdasdasdasdasdasd asdasdasdadasdasdasdasdasdasd asdasdasdaaaaaaaaaaaaasdasdasdasdasdasdasdasdaaaaaaaaaaaaaThis is More than 50 Char";
        console.log("Length: " + title.length);
        console.log("1: " + Valid.title(null, "Course Name"));
        console.log("2: " + Valid.title(title, "Course Title"));
        console.log("3: " + Valid.title("Has no Char + $ @ $", "Course Name"));
        console.log("4: " + Valid.title("as", "Course Name"));
        console.log("5: " + Valid.title("This is a Good Title", "Course Name"));
        console.log("6: " + Valid.title("", "Course Name"));

        console.log('\n');

        console.log("1: " + Valid.positiveNum(null, "Course Level"));
        console.log("2: " + Valid.positiveNum("asdas", "Course Level"));
        console.log("3: " + Valid.positiveNum(-2, "Course Level"));
        console.log("4: " + Valid.positiveNum(5, "Course Level"));
        console.log("5: " + Valid.positiveNum("", "Course Level"));

        console.log('\n');

        console.log("1: " + Valid.number(null, "Course Type"));
        console.log("2: " + Valid.number("asdas", "Course Type"));
        console.log("3: " + Valid.number(5, "Course Type"));
        console.log("4: " + Valid.number(-6, "Course Type"));
        console.log("5: " + Valid.number("", "Course Type"));

        console.log('\n');

        var youTubePlaylist1 = "https://www.youtube.com/watch?v=qj3qPrmhIXs";
        var youTubePlaylist2 = "https://www.youtube.com/watch?v=IcYZOizikwA&list=RDIcYZOizikwA";
        var youTubePlaylist3 = "https://www.youtube.com/playlist?list=PLqItuIAASZlNc3tcI7-a7VupWm1h2nEXl";
        console.log("1: " + Valid.youTubePlaylist(null, "YouTube Playlist"));
        console.log("2: " + Valid.youTubePlaylist("asdasd123123", "YouTube Playlist"));
        console.log("3: " + Valid.youTubePlaylist(youTubePlaylist1, "YouTube Playlist"));
        console.log("4: " + Valid.youTubePlaylist(youTubePlaylist2, "YouTube Playlist"));
        console.log("5: " + Valid.youTubePlaylist(youTubePlaylist3, "YouTube Playlist"));
        console.log("6: " + Valid.youTubePlaylist("", "YouTube Playlist"));

        console.log('\n');

        var description = "https://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrm" +
            "hIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps:" +
            "//www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.yout" +
            "ube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/wa" +
            "tch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3q" +
            "PrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshtt" +
            "ps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.y" +
            "PrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshtt" +
            "ps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.y" +
            "outube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com" +
            "PrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshtt" +
            "ps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.y" +
            "outube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com" +
            "PrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshtt" +
            "ps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.y" +
            "outube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com" +
            "PrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshtt" +
            "ps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.y" +
            "outube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com" +
            "PrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshtt" +
            "ps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.y" +
            "outube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com" +
            "PrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshtt" +
            "ps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.y" +
            "outube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com" +
            "PrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshtt" +
            "ps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.y" +
            "outube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com" +
            "PrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshtt" +
            "ps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.y" +
            "outube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com" +
            "PrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshtt" +
            "ps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.y" +
            "outube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com" +
            "PrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshtt" +
            "ps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.y" +
            "outube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com" +
            "tps://www.youtube.com/watch?v=qj3qPrmhIXshttps://www.youtube.com/watch?v=qj3qPrmhIXs";
        console.log("Length: " + description.length);
        console.log("1: " + Valid.description(null, "Description"));
        console.log("2: " + Valid.description(description, "Description"));
        console.log("3: " + Valid.description("asdasd123123", "Description"));
        console.log("4: " + Valid.description("", "Description"));

        console.log('\n');

        var url1 = "https://www.youtube.com/watch?v=qj3qPrmhIXs";
        var url2 = "https://www.youtube.com/watch?v=IcYZOizikwA&list=RDIcYZOizikwA";
        var url3 = "https://www.amazon.com/Java-Complete-Reference-Herbert-Schildt/dp/0071808558";
        var url4 = "https://www.safaribooksonline.com/library/view/java-the-complete/9780071808552/";
        var url5 = "https://www.coursera.org/learn/embedded-operating-system";
        console.log("1: " + Valid.url(null, "URL"));
        console.log("2: " + Valid.url("asdasd123123", "URL"));
        console.log("3: " + Valid.url(url1, "URL"));
        console.log("4: " + Valid.url(url2, "URL"));
        console.log("5: " + Valid.url(url3, "URL"));
        console.log("6: " + Valid.url(url4, "URL"));
        console.log("7: " + Valid.url(url5, "URL"));
        console.log("13: " + Valid.url("", "URL"));

        console.log('\n');

        console.log("1: " + Valid.userName(null));
        console.log("2: " + Valid.userName("Ahmed_Mater"));
        console.log("3: " + Valid.userName("12Ahmed"));
        console.log("4: " + Valid.userName("Ahmed Mater"));
        console.log("5: " + Valid.userName("Ahmed-Mater"));
        console.log("6: " + Valid.userName("Ahmed.Mater"));
        console.log("7: " + Valid.userName("Ahmed$Mater"));
        console.log("8: " + Valid.userName("_2Ahmed"));
        console.log("9: " + Valid.userName("-Ahmed1"));
        console.log("10: " + Valid.userName(".Ahmed12"));
        console.log("11: " + Valid.userName("sd"));
        console.log("12: " + Valid.userName("asdasdasdassdasdassdasdassdasdassdasdassdasdassdasdassdasdasdasdasd"));
        console.log("13: " + Valid.userName(""));

        console.log('\n');

        console.log("1: " + Valid.password(null));
        console.log("2: " + Valid.password("Ahmed_Mater"));
        console.log("3: " + Valid.password("12Ahmed"));
        console.log("4: " + Valid.password("Ahmed Mater"));
        console.log("5: " + Valid.password("Ahmed-Mate$%^&*@#~r"));
        console.log("6: " + Valid.password("sd"));
        console.log("7: " + Valid.password("asdasdasdassdasdassdasdassdasdassdasdassdasdassdasdassdasdasdasdasd"));
        console.log("8: " + Valid.password(""));

        console.log('\n');

        var dateOfBirth1 = { day: null, month: null, year: null };
        var dateOfBirth2 = { day: 11, month: null, year: null };
        var dateOfBirth3 = { day: 32, month: null, year: null };
        var dateOfBirth4 = { day: 31, month: null, year: null };
        var dateOfBirth5 = { day: 1, month: 2, year: null };
        var dateOfBirth6 = { day: 01, month: 02, year: null };
        var dateOfBirth7 = { day: 1, month: 13, year: null };
        var dateOfBirth8 = { day: 1, month: 12, year: null };
        var dateOfBirth9 = { day: 1, month: 12, year: 1699 };
        var dateOfBirth10 = { day: 1, month: 12, year: 2900 };
        var dateOfBirth11 = { day: 1, month: 12, year: 1700 };
        var dateOfBirth12 = { day: 1, month: 12, year: 2016 };
        var dateOfBirth13 = { day: 1, month: 12, year: 2017 };
        var dateOfBirth14 = { day: "", month: "", year: "" };
        console.log("1: " + Valid.date(null));
        console.log("2: " + Valid.date(dateOfBirth1));
        console.log("3: " + Valid.date(dateOfBirth2));
        console.log("4: " + Valid.date(dateOfBirth3));
        console.log("5: " + Valid.date(dateOfBirth4));
        console.log("6: " + Valid.date(dateOfBirth5));
        console.log("7: " + Valid.date(dateOfBirth6));
        console.log("8: " + Valid.date(dateOfBirth7));
        console.log("9: " + Valid.date(dateOfBirth8));
        console.log("10: " + Valid.date(dateOfBirth9));
        console.log("11: " + Valid.date(dateOfBirth10));
        console.log("12: " + Valid.date(dateOfBirth11));
        console.log("13: " + Valid.date(dateOfBirth12));
        console.log("14: " + Valid.date(dateOfBirth13));
        console.log("15: " + Valid.date(dateOfBirth13, true, "Allocation Date"));
        console.log("16: " + Valid.date(dateOfBirth13, false, "Birth Date"));
        console.log("17: " + Valid.date(dateOfBirth14, false, "Birth Date"));

        console.log('\n');

        var email1 = "ahmedmotair@gmail.com";
        var email2 = "ahmed.motair@gizasystems.com";
        var email3 = "KN-NMS@gmail.com";
        var email4 = "Nyongesa@ca.go.ke";
        console.log("1: " + Valid.email(null));
        console.log("2: " + Valid.email(email1));
        console.log("3: " + Valid.email(email2));
        console.log("4: " + Valid.email(email3));
        console.log("5: " + Valid.email(email4));
        console.log("6: " + Valid.email(""));

        console.log('\n');

        console.log("1: " + Valid.name(null, "First Name"));
        console.log("2: " + Valid.name("Ahmed Ali", "First Name"));
        console.log("3: " + Valid.name("as", "First Name"));
        console.log("4: " + Valid.name("Aasdasdasdasdasdasdasdasdasdasdasdasded Ali", "First Name"));
        console.log("2: " + Valid.name("Ahm%@#ed Ali", "First Name"));
        console.log("5: " + Valid.name(""));

        console.log('\n');

        console.log("1: " + Valid.gender(null));
        console.log("2: " + Valid.gender(""));
        console.log("3: " + Valid.gender("Aasdasdasdasdasdasdasdasdasdasdasdasded Ali"));
        console.log("4: " + Valid.gender("F"));
        console.log("5: " + Valid.gender("M"));

        res.render('home', {
            title: 'Home Page'
        });
    }
};