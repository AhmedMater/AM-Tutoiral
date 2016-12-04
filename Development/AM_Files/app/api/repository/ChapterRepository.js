/**
 * Created by ahmed.motair on 12/1/2016.
 */

var DB = rootRequire('AM-Database');

var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');

module.exports = {

    isUserFound: function(chapterName, courseID, RepositoryCallBack){
        var fnName = "isUserFound";

        var query =
            "SELECT " +
                "id FROM chapter " +
            "WHERE " +
                "user_name = " + DB.escape(chapterName) + " OR " +
                "email = " + DB.escape(courseID) + ";";

        DB.query(query, function (err, rows, fields) {
            var isFound = null;
            if (err != null) {
                Logger.error(SystemParam.REPOSITORY, fnName, err.message);
                return RepositoryCallBack(ErrMsg.createError(SystemParam.DATABASE_ERROR, 400, err.message), null);
            }

            if (rows[0] != null) {
                Logger.info(fnName, ErrMsg.INFO_7);
                isFound = true;
            } else {
                Logger.info(fnName, ErrMsg.INFO_8);
                isFound = false;
            }

            RepositoryCallBack(err, isFound);
        });
    }
};