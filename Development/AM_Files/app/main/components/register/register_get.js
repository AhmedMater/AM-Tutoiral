/**
 * Created by Ahmed Mater on 10/6/2016.
 */
var config = configRequire();
var registerView = viewPath(config.Views.register_main);

module.exports = {
    go: function(req, res, main) {
        res.render(registerView, {
            title: "Sign Up"
        });
    }
};