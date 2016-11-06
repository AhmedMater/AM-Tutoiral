var exports = module.exports = {};
var app = require('express')();
var config = require('../../configuration');

exports.go = function(req,res){
    res.render(config.Views.home, {
        title: 'Home Page'
    });
};

