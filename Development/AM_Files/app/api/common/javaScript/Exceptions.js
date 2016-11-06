/**
 * Created by Ahmed Mater on 10/7/2016.
 */

var exports = module.exports = {
    dbException: function(fn_name, msg) {
        this.message = msg;
        this.name = "Database-Exception - " + fn_name;
    },

    serviceException: function(fn_name, message) {
        this.name = "Service-Exception";
        this.message = message;
        this.function = fn_name;
    }
};