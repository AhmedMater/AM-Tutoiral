/**
 * Created by Ahmed Mater on 10/6/2016.
 */

module.exports = {
    go: function(req, res, next){
        res.render('login_main', {
            title: 'Login'
        });
    }
};