/**
 * Created by ahmed.motair on 12/18/2016.
 */

var DB = rootRequire('AM-Database');

var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');
var DB_ERROR = SystemParam.DATABASE_ERROR;

var exports = module.exports = {};

exports.createSQLDate = function(dateObj){
    return dateObj.year + "-" + dateObj.month + "-" + dateObj.day;
};
var createSQLDateCondition = function(fieldName, from, to){
    if(from != null){
        if(to != null)
            return "DATE(`" + fieldName + "`) " + " BETWEEN " + DB.escape(from) + " AND " + DB.escape(to);
        else
            return "DATE(`" + fieldName + "`) " + " > " + DB.escape(from) ;
    }else{
        if(to != null)
            return "DATE(`" + fieldName + "`) " + " < " + DB.escape(to);
        else
            return null;
    }
};
var createSQLCondition = function(condition){
    if(condition.type == "date")
        return createSQLDateCondition(condition.fieldName, condition.from, condition.to);
    else if(condition.value != null){
        if(condition.type == "boolean")
            return condition.fieldName + " " + condition.operator + " " + ((condition.value) ? DB.escape("1") : DB.escape("0"));
        else
            return condition.fieldName + " " + condition.operator + " " + DB.escape(condition.value);
    else
        return null;
    }
}

exports.constructWhereStatement = function(conditions, DBUtilityCallback){
    if(conditions.length == 0)
        return DBUtilityCallback(null, null);

    var statement = "WHERE " + createSQLCondition(conditions[0]);

    for(var i=1; i<conditions.length; i++)
        statement += " AND " + createSQLCondition(conditions[i]);

    return DBUtilityCallback(null, statement);
}

exports.insertRecord = function(query, data, repositoryName, fnName, modelName, GenericCallback){
    DB.query(query, data, function (err, rows, fields) {
        // in case of an Error
        if (err != null) {
            Logger.error(repositoryName, fnName, err.message);
            return GenericCallback(ErrMsg.createError(DB_ERROR, err.message), null);
        }

        // in case of inserting one record
        else if(rows.affectedRows == 1){
            Logger.debug(repositoryName, fnName, ErrMsg.IS_INSERTED(modelName));
            return GenericCallback(null, rows.insertId);
        }

        // in case of inserting more than one record
        else{
            Logger.error(repositoryName, fnName, ErrMsg.NOT_INSERTED(modelName));
            return GenericCallback(ErrMsg.createError(DB_ERROR, ErrMsg.NOT_INSERTED(modelName)), null);
        }
    });
};

exports.deleteRecord = function(query, repositoryName, fnName, modelName, GenericCallback){
    DB.beginTransaction(function(transactionError) {
        // in case of Transaction Error
        if (transactionError) {
            Logger.error(repositoryName, fnName, transactionError.message);
            return GenericCallback(ErrMsg.createError(DB_ERROR, transactionError.message), null);
        }

        DB.query(query, function (queryError, rows, fields) {

            // in case of Query Error
            if (queryError != null) {
                Logger.error(repositoryName, fnName, queryError.message);
                return GenericCallback(ErrMsg.createError(DB_ERROR, queryError.message), null);
            }

            // in case of only one record to be deleted
            else if (rows.affectedRows == 1) {
                DB.commit(function (commitError) {
                    if (commitError) {
                        return DB.rollback(function () {
                            Logger.error(repositoryName, fnName, commitError.message);
                            Logger.debug(repositoryName, fnName, ErrMsg.TRANS_ROLLBACK);
                            return GenericCallback(ErrMsg.createError(DB_ERROR, commitError.message), null);
                        });
                    }
                    Logger.debug(repositoryName, fnName, ErrMsg.IS_DELETED(modelName));
                    return GenericCallback(null, true);
                });
            }

            // in case of no records to be deleted
            else if (rows.affectedRows == 0) {
                Logger.debug(repositoryName, fnName, ErrMsg.DELETE_NOT_FOUND(modelName));
                return GenericCallback(null, false);
            }

            // in case of more than one record will be deleted
            else if (rows.affectedRows > 1) {
                return DB.rollback(function () {
                    Logger.error(repositoryName, fnName, ErrMsg.MANY_DELETED(modelName));
                    Logger.debug(repositoryName, fnName, ErrMsg.TRANS_ROLLBACK);
                    return GenericCallback(ErrMsg.createError(DB_ERROR, ErrMsg.MANY_DELETED(modelName)), null);
                });
            }
        });
    });
};

exports.updateRecord = function(query, attributes, repositoryName, fnName, modelName, GenericCallback){
    DB.beginTransaction(function(transactionError) {
        // in case of Transaction Error
        if (transactionError) {
            Logger.error(repositoryName, fnName, transactionError.message);
            return GenericCallback(ErrMsg.createError(DB_ERROR, transactionError.message), null);
        }

        DB.query(query, attributes, function (queryError, rows, fields) {

            // in case of Query Error
            if (queryError != null) {
                Logger.error(repositoryName, fnName, queryError.message);
                return GenericCallback(ErrMsg.createError(DB_ERROR, queryError.message), null);
            }

            // in case of only one record to be updated
            else if (rows.affectedRows == 1) {
                if(rows.changedRows == 1) {
                    DB.commit(function (commitError) {
                        if (commitError) {
                            return DB.rollback(function () {
                                Logger.error(repositoryName, fnName, commitError.message);
                                Logger.debug(repositoryName, fnName, ErrMsg.TRANS_ROLLBACK);
                                return GenericCallback(ErrMsg.createError(DB_ERROR, commitError.message), null);
                            });
                        }
                        Logger.debug(repositoryName, fnName, ErrMsg.IS_UPDATED(modelName));
                        return GenericCallback(null, true);
                    });
                } else {
                    Logger.error(repositoryName, fnName, ErrMsg.INCOMPLETE_UPDATE(modelName));
                    return GenericCallback(ErrMsg.createError(DB_ERROR, ErrMsg.INCOMPLETE_UPDATE(modelName)), null);
                }
            }

            // in case of no records to be updated
            else if (rows.affectedRows == 0) {
                Logger.debug(repositoryName, fnName, ErrMsg.UPDATE_NOT_FOUND(modelName));
                return GenericCallback(null, false);
            }

            // in case of more than one record will be updated
            else if (rows.affectedRows > 1) {
                return DB.rollback(function () {
                    Logger.error(repositoryName, fnName, ErrMsg.MANY_UPDATED(modelName));
                    Logger.debug(repositoryName, fnName, ErrMsg.TRANS_ROLLBACK);
                    return GenericCallback(ErrMsg.createError(DB_ERROR, ErrMsg.MANY_UPDATED(modelName)), null);
                });
            }
        });
    });
};

exports.isRecordFound = function(query, repositoryName, fnName, modelName, GenericCallback){
    DB.query(query, function (err, rows, fields) {
        if (err != null) {
            Logger.error(repositoryName, fnName, err.message);
            return GenericCallback(ErrMsg.createError(DB_ERROR, err.message), null);
        }else if(rows.length == 0) {
            Logger.debug(repositoryName, fnName, ErrMsg.NOT_FOUND(modelName));
            return GenericCallback(null, false);
        }else{
            Logger.debug(repositoryName, fnName, ErrMsg.IS_FOUND(modelName));
            return GenericCallback(null, true);
        }
    });
};

exports.selectValue = function(query, value, repositoryName, fnName, modelName, GenericCallback){
    DB.query(query, function (err, rows, fields) {
        if (err != null) {
            Logger.error(repositoryName, fnName, err.message);
            return GenericCallback(ErrMsg.createError(DB_ERROR, err.message), null);
        }else if(rows.length == 1) {
            Logger.debug(repositoryName, fnName, ErrMsg.IS_SELECTED(modelName));
            return GenericCallback(err, (rows[0][value]));
        }else if(rows.length > 1){
            Logger.error(repositoryName, fnName, ErrMsg.MANY_FOUND(modelName));
            return GenericCallback(ErrMsg.createError(DB_ERROR, ErrMsg.MANY_FOUND(modelName)), null);
        }else if(rows.length == 0) {
            Logger.error(repositoryName, fnName, ErrMsg.NOT_FOUND(modelName));
            return GenericCallback(ErrMsg.createError(DB_ERROR, ErrMsg.NOT_FOUND(modelName)), null);
        }
    });
};

exports.selectRecord = function(query, repositoryName, fnName, modelName, GenericCallback){
    DB.query(query, function (err, rows, fields) {
        // in case of an error
        if (err != null) {
            Logger.error(repositoryName, fnName, err.message);
            return GenericCallback(ErrMsg.createError(DB_ERROR, err.message), null);
        }else if(rows.length == 1){
            Logger.debug(repositoryName, fnName, ErrMsg.IS_SELECTED(modelName));
            return GenericCallback(null, rows[0]);
        }else if(rows.length > 1) {
            Logger.error(repositoryName, fnName, ErrMsg.MANY_SELECTED(modelName));
            return GenericCallback(ErrMsg.createError(DB_ERROR, ErrMsg.MANY_SELECTED(modelName)), null);
        }else if(rows.length == 0) {
            Logger.debug(repositoryName, fnName, ErrMsg.NOT_FOUND(modelName));
            return GenericCallback(null, null);
        }
    });
};

exports.selectAllRecords = function(query, repositoryName, fnName, modelName, GenericCallback){
    DB.query(query, function (err, rows, fields) {
        // in case of an error
        if (err != null) {
            Logger.error(repositoryName, fnName, err.message);
            return GenericCallback(ErrMsg.createError(DB_ERROR, err.message), null);
        }

        // in case of selecting only one row
        else if(rows.length == 1){
            Logger.debug(repositoryName, fnName, ErrMsg.IS_SELECTED(modelName));
            return GenericCallback(null, rows);
        }

        // case of no records is selected
        else if(rows.length == 0) {
            Logger.debug(repositoryName, fnName, ErrMsg.NOT_FOUND(modelName));
            return GenericCallback(null, null);
        }

        // case of more than one record is selected
        else if(rows.length > 1) {
            Logger.error(repositoryName, fnName, ErrMsg.MANY_SELECTED(modelName));
            return GenericCallback(ErrMsg.createError(DB_ERROR, ErrMsg.MANY_SELECTED(modelName)), null);
        }
    });
};