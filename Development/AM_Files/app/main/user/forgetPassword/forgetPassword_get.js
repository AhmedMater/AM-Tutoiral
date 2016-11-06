/**
 * Created by Ahmed Mater on 10/9/2016.
 */
var exports = module.exports = {};

exports.go = function(req,res, title, view, result, configParams) {

    if(result == configParams.FORGET_PASSWORD_SUCCESS){

    }
    else if(result == configParams.FORGET_PASSWORD_FAIL){

    }
    else{

    }
    res.render(view, {
        isUserLoggedIn: false,
        title: title,
    });
}
