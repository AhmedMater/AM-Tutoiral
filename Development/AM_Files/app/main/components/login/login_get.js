/**
 * Created by Ahmed Mater on 10/6/2016.
 */
var config = configRequire();
var loginView = viewPath(config.Views.login);

module.exports = {
    go: function(req, res, next){
        res.render(loginView, {
            title: 'Login'
        });
    }
};