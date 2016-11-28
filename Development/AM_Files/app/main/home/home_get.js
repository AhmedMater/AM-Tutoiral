
var config = configRequire();
var homeView = viewPath(config.Views.home);

module.exports = {

    go : function(req, res, next) {
        res.render(homeView, {
            title: 'Home Page'
        });
    }
};