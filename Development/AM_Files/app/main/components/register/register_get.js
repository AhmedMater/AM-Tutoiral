/**
 * Created by Ahmed Mater on 10/6/2016.
 */
var exports = module.exports = {};
var config = require('../../../configuration');

exports.go = function(req,res) {

    res.render(config.Views.register_main, {
        title: "Sign Up"
    });
};