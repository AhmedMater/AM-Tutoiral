
var Valid = rootRequire('Validation');

module.exports = {

    go : function(req, res, next) {

        res.render('home', {
            title: 'Home Page'
        });
    }
};