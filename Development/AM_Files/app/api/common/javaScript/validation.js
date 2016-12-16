/**
 * Created by Ahmed Mater on 12/12/2016.
 */

var ErrMsg = rootRequire('ErrorMessages');
var exports = module.exports = {};

/**
 * It validates Title String
 * The Title can have English Letters, Numbers, space and Symbols (- and /)
 * The Title has to be at least 5 Characters and max 70 Characters
 * Regular Expression: ^[A-Za-z0-9 \-\/]+$
 * @param title
 * @param mandatory
 * @param fieldName
 * @returns String Error Message - if the title violates the validation <br/>
 *          null - if the title didn't violates the Validation or title is null & not Mandatory
 */
exports.title = function(title, mandatory, fieldName){
    var regex = /^[A-Za-z0-9 \-\/]+$/;

    if(title == null){
        if (mandatory)
            return ErrMsg.MANDATORY_NULL_FIELD(fieldName);
        else
            return null;
    }else if(title == "")
        return ErrMsg.EMPTY_FIELD(fieldName);
    else if(!regex.test(title))
        return ErrMsg.INVALID_FIELD(fieldName, ErrMsg.ERROR_MSG_TITLE_1);
    else if (title.length >= 70)
        return ErrMsg.LONG_LENGTH_FIELD(fieldName, ErrMsg.ERROR_MSG_TITLE_2);
    else if (title.length <= 5)
        return ErrMsg.SHORT_LENGTH_FIELD(fieldName, ErrMsg.ERROR_MSG_TITLE_3);
    else
        return null;
};

/**
 * It validates Number that has to be Number and Positive Value
 * Regular Expression: ^[0-9]+$
 * @param number
 * @param mandatory
 * @param fieldName
 * @returns String Error Message - if the Number violates the validation <br/>
 *          null - if the Number didn't violates the Validation
 */
exports.positiveNum = function(number, mandatory, fieldName){
    var regex = /^[0-9]+$/;

    if (number == null){
        if (mandatory)
            return ErrMsg.MANDATORY_NULL_FIELD(fieldName);
        else
            return null;
    }else if(number == "")
        return ErrMsg.EMPTY_FIELD(fieldName);
    else if(number <= 1)
        return ErrMsg.INVALID_FIELD(fieldName, ErrMsg.ERROR_MSG_NUM_2);
    else if(!regex.test(number))
        return ErrMsg.INVALID_FIELD(fieldName, ErrMsg.ERROR_MSG_NUM_1);
    else
        return null;
};

/**
 * It validates Number that has to be Number and It can be Positive or Negative Value
 * Regular Expression ^\-?[0-9]+$
 * @param number
 * @param mandatory
 * @param fieldName
 * @returns String Error Message - if the Number violates the validation <br/>
 *          null - if the Number didn't violates the Validation
 */
exports.number = function(number, mandatory, fieldName) {
    var regex = /^\-?[0-9]+$/;


    if (number == null){
        if (mandatory)
            return ErrMsg.MANDATORY_NULL_FIELD(fieldName);
        else
            return null;
    }else if(number == "")
        return ErrMsg.EMPTY_FIELD(fieldName);
    else if(!regex.test(number))
        return ErrMsg.INVALID_FIELD(fieldName, ErrMsg.ERROR_MSG_NUM_1);
    else
        return null;
};

/**
 * It validates Youtube Playlist
 * Regular Expression: ^http(s)?:\/\/(?:www\.)?youtube\.com\/playlist\?list=[a-zA-Z0-9_\-]+$
 * @param youTubePlaylist
 * @param mandatory
 * @param fieldName
 * @returns String Error Message - if the Youtube Playlist violates the validation <br/>
 *          null - if the Youtube Playlist didn't violates the Validation
 */
exports.youTubePlaylist = function (youTubePlaylist, mandatory){
    var fieldName = 'Youtube Playlist';
    var regex = /^http(s)?:\/\/(?:www\.)?youtube\.com\/(playlist\?|watch\?v=[a-zA-Z0-9_\-]+&)list=[a-zA-Z0-9_\-]+$/;

    if(youTubePlaylist == null){
        if (mandatory)
            return ErrMsg.MANDATORY_NULL_FIELD(fieldName);
        else
            return null;
    }else if(youTubePlaylist == "")
            return ErrMsg.EMPTY_FIELD(fieldName);
    else if(!regex.test(youTubePlaylist))
        return ErrMsg.INVALID_FIELD(fieldName);
    else
        return null;
};

/**
 * It validates Description String that can't be more than 500 Characters mix of Letters, Numbers and Symbols
 * Regular Expression: ^[A-Za-z0-9 \-\/\_\!\@\#\$\%\^\&\*\<\>\{\}\[\]\(\)\=\+]+$
 * @param description
 * @param mandatory
 * @param fieldName
 * @returns String Error Message - if the Description violates the validation <br/>
 *          null - if the Description didn't violates the Validation
 */
exports.description = function(description, mandatory, fieldName){
    var regex = /^[A-Za-z0-9 \.\-\/\_\!\@\#\$\%\^\&\*\<\>\{\}\[\]\(\)\=\+]+$/;

    if(description == null){
        if (mandatory)
            return ErrMsg.MANDATORY_NULL_FIELD(fieldName);
        else
            return null;
    }else if(description == "")
        return ErrMsg.EMPTY_FIELD(fieldName);
    else if(!regex.test(description))
        return ErrMsg.INVALID_FIELD(fieldName, ErrMsg.ERROR_MSG_DESCRIPTION_1);
    else if (description.length >= 500)
        return ErrMsg.LONG_LENGTH_FIELD(fieldName, ErrMsg.ERROR_MSG_DESCRIPTION_2);
    else if (description.length <= 20)
        return ErrMsg.SHORT_LENGTH_FIELD(fieldName, ErrMsg.ERROR_MSG_DESCRIPTION_3);
    else
        return null;
};

/**
 * It validates URL String
 * Regular Expression: ^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$
 * @param url
 * @param mandatory
 * @param fieldName
 * @returns String Error Message - if the URL violates the validation <br/>
 *          null - if the URL didn't violates the Validation
 */
exports.url = function(url, mandatory, fieldName){
    var regex = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/;

    if(url == null){
        if (mandatory)
            return ErrMsg.MANDATORY_NULL_FIELD(fieldName);
        else
            return null;
    }else if(url == "")
        return ErrMsg.EMPTY_FIELD(fieldName);
    else if (!regex.test(url))
        return ErrMsg.INVALID_FIELD(fieldName);
    else
        return null;
};

/**
 * It validates User Name String that can to be mix of Letters or Numbers or space and only Symbols(. _ -)
 * It has to be at least 5 Characters and max 25 Characters
 * Regular Expression: ^[A-Za-z0-9\_\.\-]{5,25}$
 * @param userName
 * @param mandatory
 * @returns String Error Message - if the User Name violates the validation <br/>
 *          null - if the User Name didn't violates the Validation
 */
exports.userName = function(userName, mandatory){
    var fieldName = 'User Name';
    var regex = /^[A-Za-z\_\.\-][A-Za-z0-9\_\.\-]+$/;

    if(userName == null){
        if (mandatory)
            return ErrMsg.MANDATORY_NULL_FIELD(fieldName);
        else
            return null;
    }else if(userName == "")
        return ErrMsg.EMPTY_FIELD(fieldName);
    else if(!regex.test(userName))
        return ErrMsg.INVALID_FIELD(fieldName, ErrMsg.ERROR_MSG_USERNAME_1);
    else if (userName.length >= 25)
        return ErrMsg.LONG_LENGTH_FIELD(fieldName, ErrMsg.ERROR_MSG_USERNAME_2);
    else if (userName.length <= 5)
        return ErrMsg.SHORT_LENGTH_FIELD(fieldName, ErrMsg.ERROR_MSG_USERNAME_3);
    else
        return null;
};

/**
 * It validates Password String that can to be mix of Letters or Numbers and only Symbols (@%+\/'!#$^?:.(){}[]~-_)
 * It has to be at least 5 Characters and max 25 Characters
 * Regular Expression: ^[A-Za-z0-9\@\%\+\\/\'\!\#\$\^\?\:\.\(\)\{\}\[\]\~\-\_]{5,20}$
 * @param password
 * @param mandatory
 * @returns String Error Message - if the Password violates the validation <br/>
 *          null - if the Password didn't violates the Validation
 */
exports.password = function(password, mandatory){
    var fieldName = 'Password';
    var regex = /^[A-Za-z0-9\@\%\+\\\/\!\#\$\&\^\?\:\.\(\)\{\}\[\]\~\-\_]+$/;

    if(password == null){
        if (mandatory)
            return ErrMsg.MANDATORY_NULL_FIELD(fieldName);
        else
            return null;
    }else if(password == "")
        return ErrMsg.EMPTY_FIELD(fieldName);
    else if(!regex.test(password))
        return ErrMsg.INVALID_FIELD(fieldName, ErrMsg.ERROR_MSG_PASSWORD_1);
    else if(password.length >= 20)
        return ErrMsg.LONG_LENGTH_FIELD(fieldName, ErrMsg.ERROR_MSG_PASSWORD_2);
    else if(password.length <= 5)
        return ErrMsg.SHORT_LENGTH_FIELD(fieldName, ErrMsg.ERROR_MSG_PASSWORD_3);
    else
        return null;
};

/**
 * It Validates Date Components Day, Month and Year
 * Day Regular Expression: ^(0[1-9]|[12][0-9]|3[01])$
 * Month Regular Expression: ^(0[1-9]|[1][0-2])$
 * Year Regular Expression: ^(1|2)[7-9][0-9][0-9]$
 * @param date Object has attributes { day, month, year }
 * @param isFuture Boolean - true if date can be in future
 * @param fieldName
 * @returns String Error Message - if the Date violates the validation <br/>
 *          null - if the Date didn't violates the Validation
 */
exports.date = function(date, mandatory, fieldName, isFuture){
    var day_regex = /^(0?[1-9]|[12][0-9]|3[01])$/;
    var month_regex = /^(0?[1-9]|[1][0-2])$/;
    var year_regex = /^[0-9]{4}$/;

    var dayField = 'Day';
    var monthField = 'Month';
    var yearField = 'Year';

    var today = new Date();

    if(date == null){
        if (mandatory)
            return ErrMsg.MANDATORY_NULL_FIELD(fieldName);
        else
            return null;
    }else if(date == "")
        return ErrMsg.EMPTY_FIELD(fieldName);

    else if(date.day == "")
        return ErrMsg.EMPTY_FIELD(dayField);
    else if(date.day == null)
        return ErrMsg.MANDATORY_NULL_FIELD(dayField);
    else if(!day_regex.test(date.day))
        return ErrMsg.INVALID_FIELD(dayField, ErrMsg.ERROR_MSG_DAY_1);

    else if(date.month == "")
        return ErrMsg.EMPTY_FIELD(monthField);
    else if(date.month == null)
        return ErrMsg.MANDATORY_NULL_FIELD(monthField);
    else if(!month_regex.test(date.month))
        return ErrMsg.INVALID_FIELD(monthField, ErrMsg.ERROR_MSG_MONTH_1);

    else if(date.year == "")
        return ErrMsg.EMPTY_FIELD(yearField);
    else if(date.year == null)
        return ErrMsg.MANDATORY_NULL_FIELD(yearField);
    else if(!year_regex.test(date.year))
        return ErrMsg.INVALID_FIELD(yearField, ErrMsg.ERROR_MSG_YEAR_1);

    //else if(date.day < 1)
    //    return ErrMsg.INVALID_FIELD('Day', ErrMsg.ERROR_MSG_DAY_1);
    //else if(date.month < 1)
    //    return ErrMsg.INVALID_FIELD('Month');
    //else if(date.year < 1)
    //    return ErrMsg.INVALID_FIELD('Year');

    else if(date.year < 1900)
        return ErrMsg.INVALID_FIELD(yearField, ErrMsg.ERROR_MSG_YEAR_1);
    else if(date.month == 2 && date.day > 29)
        return ErrMsg.INVALID_FIELD(dayField + ' or ' + monthField, ErrMsg.ERROR_MSG_MONTH_2);
    else if( ([4, 6, 9, 11].indexOf(date.month) > -1) && date.day == 31)
        return ErrMsg.INVALID_FIELD(dayField + ' or ' + monthField, ErrMsg.ERROR_MSG_MONTH_3);
    else if(!isFuture){
        var dateString = date.year + "-" + (date.month) + "-" + ((/^[1-9]$/.test(date.day)) ? "0" + date.day : date.day);
        var _date = new Date(dateString);

        if(today.getTime() < _date.getTime())
            return ErrMsg.DATE_IN_FUTURE(fieldName);
        else
            return null;
    } else
        return null;

};

/**
 * It validates Email String
 * Regular Expression: ^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$
 * @param email
 * @param mandatory
 * @returns String Error Message - if the Email violates the validation <br/>
 *          null - if the Email didn't violates the Validation
 */
exports.email = function(email, mandatory){
    var fieldName = 'Email';
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(email == null){
        if (mandatory)
            return ErrMsg.MANDATORY_NULL_FIELD(fieldName);
        else
            return null;
    }else if(email == "")
        return ErrMsg.EMPTY_FIELD(fieldName);
    else if(!regex.test(email))
        return ErrMsg.INVALID_FIELD(fieldName);
    else
        return null;
};

/**
 * It validates Name String that can have English Letters and space with max 25 Characters
 * Regular Expression: ^[A-Za-z ]+$
 * @param name
 * @param mandatory
 * @param fieldName
 * @returns String Error Message - if the Name violates the validation <br/>
 *          null - if the Name didn't violates the Validation
 */
exports.name = function(name, mandatory, fieldName){
    var regex = /^[A-Za-z ]+$/;

    if(name == null){
        if (mandatory)
            return ErrMsg.MANDATORY_NULL_FIELD(fieldName);
        else
            return null;
    }else if(name == "")
        return ErrMsg.EMPTY_FIELD(fieldName);
    else if(!regex.test(name))
        return ErrMsg.INVALID_FIELD(fieldName, ErrMsg.ERROR_MSG_NAME_1);
    else if (name.length > 15)
        return ErrMsg.LONG_LENGTH_FIELD(fieldName, ErrMsg.ERROR_MSG_NAME_2);
    else
        return null;
};

/**
 * It validates Gender String that has to be M (for Male) or F (for Female)
 * Regular Expression: ^(M|F)$
 * @param gender
 * @returns String Error Message - if the Gender violates the validation <br/>
 *          null - if the Gender didn't violates the Validation
 */
exports.gender = function(gender, mandatory){
    var fieldName = 'Gender';
    var regex = /^(M|F)$/;

    if(gender == null){
        if (mandatory)
            return ErrMsg.MANDATORY_NULL_FIELD(fieldName);
        else
            return null;
    }else if(gender == "")
        return ErrMsg.EMPTY_FIELD(fieldName);
    else if(!regex.test(gender))
        return ErrMsg.INVALID_FIELD(fieldName, ErrMsg.ERROR_MSG_GENDER);
    else
        return null;
};

/**
 * It validates YouTube URL String
 * Regular Expression: ^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$
 * @param youTube
 * @param mandatory
 * @param fieldName
 * @returns String Error Message - if the YouTube URL violates the validation <br/>
 *          null - if the YouTube URL didn't violates the Validation
 */
exports.youTube = function(youTube, mandatory, fieldName){
    var regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;

    if(youTube == null){
        if (mandatory)
            return ErrMsg.MANDATORY_NULL_FIELD(fieldName);
        else
            return null;
    }else if(youTube == "")
        return ErrMsg.EMPTY_FIELD(fieldName);
    else if (!regex.test(youTube))
        return ErrMsg.INVALID_FIELD(fieldName);
    else
        return null;
};