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
 * @param fieldName
 * @returns String Error Message - if the title violates the validation <br/>
 *          null - if the title didn't violates the Validation
 */
exports.title = function(title, fieldName){
    var regex = /^[A-Za-z0-9 \-\/]+$/;

    if(title == null)
        return ErrMsg.error_1_MandatoryFieldMissing(fieldName);
    else if(!regex.test(title))
        return ErrMsg.error_2_InvalidData(fieldName);
    else if (title.length > 70)
        return ErrMsg.error_3_LongLengthData(fieldName);
    else if (title.length < 5)
        return ErrMsg.error_4_ShortLengthData(fieldName);
    else
        return null;
};

/**
 * It validates Number that has to be Number and Positive Value
 * Regular Expression: ^[0-9]+$
 * @param number
 * @param fieldName
 * @returns String Error Message - if the Number violates the validation <br/>
 *          null - if the Number didn't violates the Validation
 */
exports.positiveNum = function(number, fieldName){
    var regex = /^[0-9]+$/;

    if(number == null)
        return ErrMsg.error_1_MandatoryFieldMissing(fieldName);
    else if(!regex.test(number))
        return ErrMsg.error_2_InvalidData(fieldName);
    else if(number < 1)
        return ErrMsg.error_2_InvalidData(fieldName);
    else
        return null;
};

/**
 * It validates Number that has to be Number and It can be Positive or Negative Value
 * Regular Expression ^\-?[0-9]+$
 * @param number
 * @param fieldName
 * @returns String Error Message - if the Number violates the validation <br/>
 *          null - if the Number didn't violates the Validation
 */
exports.number = function(number, fieldName){
    var regex = /^\-?[0-9]+$/;

    if(number == null)
        return ErrMsg.error_1_MandatoryFieldMissing(fieldName);
    else if(!regex.test(number))
        return ErrMsg.error_2_InvalidData(fieldName);
    else
        return null;
};

/**
 * It validates Youtube Playlist
 * Regular Expression: ^http(s)?:\/\/(?:www\.)?youtube\.com\/playlist\?list=[a-zA-Z0-9_\-]+$
 * @param youTubePlaylist
 * @param fieldName
 * @returns String Error Message - if the Youtube Playlist violates the validation <br/>
 *          null - if the Youtube Playlist didn't violates the Validation
 */
exports.youTubePlaylist = function (youTubePlaylist, fieldName){
    //youTubePlayList: /^http(s)?:\/\/(?:www\.)?youtube\.com\/watch\?(?:&.*)*((?:v=([a-zA-Z0-9_\-]{11})(?:&.*)*)|(?:list=([a-zA-Z0-9_\-]{18})(?:&.*)*&v=([a-zA-Z0-9_\-]{11})))(?:&.*)*(?:\#.*)*$/,
    var regex = /^http(s)?:\/\/(?:www\.)?youtube\.com\/playlist\?list=[a-zA-Z0-9_\-]+$/;

    if(youTubePlaylist == null)
        return ErrMsg.error_1_MandatoryFieldMissing(fieldName);
    else if(!regex.test(youTubePlaylist))
        return ErrMsg.error_2_InvalidData(fieldName);
    else
        return null;
};

/**
 * It validates Description String that can't be more than 500 Characters mix of Letters, Numbers and Symbols
 * Regular Expression: ^[A-Za-z0-9 \-\/\_\!\@\#\$\%\^\&\*\<\>\{\}\[\]\(\)\=\+]+$
 * @param description
 * @param fieldName
 * @returns String Error Message - if the Description violates the validation <br/>
 *          null - if the Description didn't violates the Validation
 */
exports.description = function(description, fieldName){
    var regex = /^[A-Za-z0-9 \-\/\_\!\@\#\$\%\^\&\*\<\>\{\}\[\]\(\)\=\+]+$/;

    if (description == null)
        return null;
    else if(!regex.test(description))
        return ErrMsg.error_2_InvalidData(fieldName);
    else if (description.length > 500)
        return ErrMsg.error_3_LongLengthData(fieldName);
    else
        return null;
};

/**
 * It validates URL String
 * Regular Expression: ^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$
 * @param url
 * @param fieldName
 * @returns String Error Message - if the URL violates the validation <br/>
 *          null - if the URL didn't violates the Validation
 */
exports.url = function(url, fieldName){
    var regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    if (url == null)
        return ErrMsg.error_1_MandatoryFieldMissing(fieldName);
    else if (!regex.test(url))
        return ErrMsg.error_2_InvalidData(fieldName);
    else
        return null;
};

/**
 * It validates User Name String that can to be mix of Letters or Numbers or space and only Symbols(. _ -)
 * It has to be at least 5 Characters and max 25 Characters
 * Regular Expression: ^[A-Za-z0-9\_\.\-]{5,25}$
 * @param userName
 * @returns String Error Message - if the User Name violates the validation <br/>
 *          null - if the User Name didn't violates the Validation
 */
exports.userName = function(userName){
    var regex = /^[A-Za-z\_\.\-][A-Za-z0-9\_\.\-]{4,24}$/;

    if(userName == null)
        return ErrMsg.error_1_MandatoryFieldMissing('User Name');
    else if(!regex.test(userName))
        return ErrMsg.error_2_InvalidData('User Name');
    else if (userName.length > 25)
        return ErrMsg.error_3_LongLengthData('User Name');
    else if (userName.length < 5)
        return ErrMsg.error_4_ShortLengthData('User Name');
    else
        return null;
};

/**
 * It validates Password String that can to be mix of Letters or Numbers and only Symbols (@%+\/'!#$^?:.(){}[]~-_)
 * It has to be at least 5 Characters and max 25 Characters
 * Regular Expression: ^[A-Za-z0-9\@\%\+\\/\'\!\#\$\^\?\:\.\(\)\{\}\[\]\~\-\_]{5,20}$
 * @param password
 * @returns String Error Message - if the Password violates the validation <br/>
 *          null - if the Password didn't violates the Validation
 */
exports.password = function(password){
    var regex = /^[A-Za-z0-9\@\%\+\\/\'\!\#\$\^\?\:\.\(\)\{\}\[\]\~\-\_]{5,20}$/;

    if(password == null)
        return ErrMsg.error_1_MandatoryFieldMissing('Password');
    else if(!regex.test(password))
        return ErrMsg.error_2_InvalidData('Password');
    else if (password.length > 20)
        return ErrMsg.error_3_LongLengthData('Password');
    else if (password.length < 5)
        return ErrMsg.error_4_ShortLengthData('Password');
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
exports.date = function(date, isFuture, fieldName){
    var day_regex = /^(0?[1-9]|[12][0-9]|3[01])$/;
    var month_regex = /^(0?[1-9]|[1][0-2])$/;
    var year_regex = /^(1|2)[7-9][0-9][0-9]$/;

    var today = new Date();

    if(date.day == null)
        return ErrMsg.error_1_MandatoryFieldMissing('Day');
    else if(!RegExp.day_regex.test(date.day))
        return ErrMsg.error_2_InvalidData('Day');
    else if(date.day < 1)
        return ErrMsg.error_2_InvalidData('Day');
    else if(date.month == null)
        return ErrMsg.error_1_MandatoryFieldMissing('Month');
    else if(!RegExp.month_regex.test(date.month))
        return ErrMsg.error_2_InvalidData('Month');
    else if(date.month < 1)
        return ErrMsg.error_2_InvalidData('Month');
    else if(date.year == null)
        return ErrMsg.error_1_MandatoryFieldMissing('Year');
    else if(!RegExp.year_regex.test(date.year))
        return ErrMsg.error_2_InvalidData('Year');
    else if(date.year < 1)
        return ErrMsg.error_2_InvalidData('Year');
    else if(!isFuture){
        var _date = new Date(date.year, date.month, date.day);

        if(today < _date)
            return ErrMsg.error_6_DateInFuture(fieldName);
        else
            return null;
    } else
        return null;

};

/**
 * It validates Email String
 * Regular Expression: ^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$
 * @param email
 * @returns String Error Message - if the Email violates the validation <br/>
 *          null - if the Email didn't violates the Validation
 */
exports.email = function(email){
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(email == null)
        return ErrMsg.error_1_MandatoryFieldMissing('Email');
    else if(!regex.test(email))
        return ErrMsg.error_2_InvalidData('Email');
    else
        return null;
};

/**
 * It validates Name String that can have English Letters and space with max 25 Characters
 * Regular Expression: ^[A-Za-z ]+$
 * @param name
 * @param fieldName
 * @returns String Error Message - if the Name violates the validation <br/>
 *          null - if the Name didn't violates the Validation
 */
exports.name = function(name, fieldName){
    var regex = /^[A-Za-z ]+$/;

    if (name == null)
        return null;
    else if(!regex.test(name))
        return ErrMsg.error_2_InvalidData(fieldName);
    else if (name.length > 15)
        return ErrMsg.error_3_LongLengthData(fieldName);
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
exports.gender = function(gender){
    var regex = /^(M|F)$/;

    if(gender == null)
        return ErrMsg.error_1_MandatoryFieldMissing('Gender');
    else if(!regex.test(name))
        return ErrMsg.error_2_InvalidData('Gender');
    else
        return null;
};