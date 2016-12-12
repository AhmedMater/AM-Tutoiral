/**
 * Created by Ahmed Mater on 12/12/2016.
 */

var ErrMsg = rootRequire('ErrorMessages');

var name = function(name, fieldName){
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
};;