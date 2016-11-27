var exports = module.exports = {};
var config = require('../../configuration');

exports.go = function(req,res){
    res.render(config.Views.home, {
        title: 'Home Page'
    });
};

