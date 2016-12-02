/**
 * Created by Ahmed Mater on 10/6/2016.
 */


module.exports = {
    go: function(req, res, main) {
        res.render('register_main', {
            title: "Sign Up"
        });
    }
};