/**
 * Created by Ahmed Mater on 12/12/2016.
 */

var ErrMsg = rootRequire('ErrorMessages');

var title = function(name, fieldName){
    var regex = /^[A-Za-z0-9 \-\/]+$/;

    if(name == null)
        return ErrMsg.error_1_MandatoryFieldMissing(fieldName);
    else if(!RegExp.regex.test(name))
        return ErrMsg.error_2_InvalidData(fieldName);
    else if (name.length > 70)
        return ErrMsg.error_3_LongLengthData(fieldName);
    else if (name.length < 5)
        return ErrMsg.error_4_ShortLengthData(fieldName);
    else
        return null;
};
var positiveNum = function(number, fieldName){
    var regex = /^[0-9]+$/;

    if(number == null)
        return ErrMsg.error_1_MandatoryFieldMissing(fieldName);
    else if(!RegExp.regex.test(number))
        return ErrMsg.error_2_InvalidData(fieldName);
    else if(number < 1)
        return ErrMsg.error_2_InvalidData(fieldName);
    else
        return null;
};
var youTubePlayList = function (youTubePlaylist, fieldName){
    //youTubePlayList: /^http(s)?:\/\/(?:www\.)?youtube\.com\/watch\?(?:&.*)*((?:v=([a-zA-Z0-9_\-]{11})(?:&.*)*)|(?:list=([a-zA-Z0-9_\-]{18})(?:&.*)*&v=([a-zA-Z0-9_\-]{11})))(?:&.*)*(?:\#.*)*$/,
    var regex = /^http(s)?:\/\/(?:www\.)?youtube\.com\/playlist\?list=[a-zA-Z0-9_\-]+$/;

    if(youTubePlaylist == null)
        return ErrMsg.error_1_MandatoryFieldMissing(fieldName);
    else if(!RegExp.regex.test(youTubePlaylist))
        return ErrMsg.error_2_InvalidData(fieldName);
    else
        return null;
};
var description = function(description, fieldName){

};
var url = function(url, fieldName){
    var regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    if (url == null)
        return ErrMsg.error_1_MandatoryFieldMissing(fieldName);
    else if (!RegExp.regex.test(url))
        return ErrMsg.error_2_InvalidData(fieldName);
    else
        return null;
};

var userName = function(userName){
    var regex = /^[A-Za-z0-9\_\.\-]{5,25}$/;

    if(userName == null)
        return ErrMsg.error_1_MandatoryFieldMissing('User Name');
    else if(!RegExp.regex.test(userName))
        return ErrMsg.error_2_InvalidData('User Name');
    else if (userName.length > 25)
        return ErrMsg.error_3_LongLengthData('User Name');
    else if (userName.length < 5)
        return ErrMsg.error_4_ShortLengthData('User Name');
    else
        return null;
};
var password = function(password){
    var regex = /^[A-Za-z0-9]{5,20}$/;

    if(password == null)
        return ErrMsg.error_1_MandatoryFieldMissing('Password');
    else if(!RegExp.regex.test(password))
        return ErrMsg.error_2_InvalidData('Password');
    else if (password.length > 20)
        return ErrMsg.error_3_LongLengthData('Password');
    else if (password.length < 5)
        return ErrMsg.error_4_ShortLengthData('Password');
    else
        return null;
};

var date = function(date, isFuture){
    var day_regex = /^(0[1-9]|[12][0-9]|3[01])$/;
    var month_regex = /^(0[1-9]|[12][0-9]|3[01])$/;
    var year_regex = /^(1|2)[7-9][0-9][0-9]$/;

    var today = new Date();

    if(date.day == null)
        return ErrMsg.error_1_MandatoryFieldMissing('Day');
    else if(!RegExp.day_regex.test(date.day))
        return ErrMsg.error_2_InvalidData('Day');
    else if(number < 1)
        return ErrMsg.error_2_InvalidData('Day');
    else if(date.month == null)
        return ErrMsg.error_1_MandatoryFieldMissing('Month');
    else if(!RegExp.month_regex.test(date.month))
        return ErrMsg.error_2_InvalidData('Month');
    else if(number < 1)
        return ErrMsg.error_2_InvalidData('Month');
    else if(date.year == null)
        return ErrMsg.error_1_MandatoryFieldMissing('Year');
    else if(!RegExp.year_regex.test(date.year))
        return ErrMsg.error_2_InvalidData('Year');
    else if(number < 1)
        return ErrMsg.error_2_InvalidData('Year');
    else if(!isFuture){
        var _date = new Date()
    }
    else
        return null;

};

var email = function(email){
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(email == null)
        return ErrMsg.error_1_MandatoryFieldMissing(fieldName);
    else if(!RegExp.regex.test(email))
        return ErrMsg.error_2_InvalidData(fieldName);
    else
        return null;
}