/**
 * Created by Ahmed Mater on 10/16/2016.
 */

var exports = module.exports = {};

exports.requireAuthentication = function(req, res, next) {

    res.locals.user = req.user;
    res.locals.authenticated = true;
    next();
}