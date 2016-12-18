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

exports.insertRecord = function(query, data, repositoryName, fnName, recordName, GenericCallback){
    DB.query(query, data, function (err, rows, fields) {
        // in case of an Error
        if (err != null) {
            Logger.error(repositoryName, fnName, err.message);
            return GenericCallback(ErrMsg.createError(DB_ERROR, err.message), null);
        }

        // in case of inserting one record
        else if(rows.affectedRows == 1){
            Logger.debug(repositoryName, fnName, ErrMsg.IS_INSERTED(recordName));
            return GenericCallback(null, rows.insertId);
        }

        // in case of inserting more than one record
        else{
            Logger.error(repositoryName, fnName, ErrMsg.NOT_INSERTED(recordName));
            return GenericCallback(ErrMsg.createError(DB_ERROR, ErrMsg.NOT_INSERTED(recordName)), null);
        }
    });
};

exports.deleteRecord = function(query, repositoryName, fnName, recordName, GenericCallback){
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
                    Logger.debug(repositoryName, fnName, ErrMsg.IS_DELETED(recordName));
                    return GenericCallback(null, true);
                });
            }

            // in case of no records to be deleted
            else if (rows.affectedRows == 0) {
                Logger.debug(repositoryName, fnName, ErrMsg.DELETE_NOT_FOUND(recordName));
                return GenericCallback(null, false);
            }

            // in case of more than one record will be deleted
            else if (rows.affectedRows > 1) {
                return DB.rollback(function () {
                    Logger.error(repositoryName, fnName, ErrMsg.MANY_DELETED(recordName));
                    Logger.debug(repositoryName, fnName, ErrMsg.TRANS_ROLLBACK);
                    return GenericCallback(ErrMsg.createError(DB_ERROR, ErrMsg.MANY_DELETED(recordName)), null);
                });
            }
        });
    });
};

exports.updateRecord = function(query, conditions, repositoryName, fnName, recordName, GenericCallback){
    DB.beginTransaction(function(transactionError) {
        // in case of Transaction Error
        if (transactionError) {
            Logger.error(repositoryName, fnName, transactionError.message);
            return GenericCallback(ErrMsg.createError(DB_ERROR, transactionError.message), null);
        }

        DB.query(query, conditions, function (queryError, rows, fields) {

            // in case of Query Error
            if (queryError != null) {
                Logger.error(repositoryName, fnName, queryError.message);
                return GenericCallback(ErrMsg.createError(DB_ERROR, queryError.message), null);
            }

            // in case of only one record to be updated
            else if (rows.affectedRows == 1) {
                DB.commit(function (commitError) {
                    if (commitError) {
                        return DB.rollback(function () {
                            Logger.error(repositoryName, fnName, commitError.message);
                            Logger.debug(repositoryName, fnName, ErrMsg.TRANS_ROLLBACK);
                            return GenericCallback(ErrMsg.createError(DB_ERROR, commitError.message), null);
                        });
                    }
                    Logger.debug(repositoryName, fnName, ErrMsg.IS_UPDATED(recordName));
                    return GenericCallback(null, true);
                });
            }

            // in case of no records to be updated
            else if (rows.affectedRows == 0) {
                Logger.debug(repositoryName, fnName, ErrMsg.UPDATE_NOT_FOUND(recordName));
                return GenericCallback(null, false);
            }

            // in case of more than one record will be updated
            else if (rows.affectedRows > 1) {
                return DB.rollback(function () {
                    Logger.error(repositoryName, fnName, ErrMsg.MANY_UPDATED(recordName));
                    Logger.debug(repositoryName, fnName, ErrMsg.TRANS_ROLLBACK);
                    return GenericCallback(ErrMsg.createError(DB_ERROR, ErrMsg.MANY_UPDATED(recordName)), null);
                });
            }
        });
    });
};

exports.isRecordFound = function(query, repositoryName, fnName, recordName, GenericCallback){
    DB.query(query, function (err, rows, fields) {
        if (err != null) {
            Logger.error(repositoryName, fnName, err.message);
            return GenericCallback(ErrMsg.createError(DB_ERROR, err.message), null);
        }else if(rows.length == 0) {
            Logger.debug(repositoryName, fnName, ErrMsg.NOT_FOUND(recordName));
            return GenericCallback(null, false);
        }else{
            Logger.debug(repositoryName, fnName, ErrMsg.IS_FOUND(recordName));
            return GenericCallback(null, true);
        }
    });
};

exports.selectValue = function(query, repositoryName, fnName, recordName, GenericCallback){
    DB.query(query, function (err, rows, fields) {
        if (err != null) {
            Logger.error(repositoryName, fnName, err.message);
            return GenericCallback(ErrMsg.createError(DB_ERROR, err.message), null);
        }else if(rows.length == 1) {
            Logger.debug(repositoryName, fnName, ErrMsg.IS_SELECTED(recordName));
            return GenericCallback(err, (rows[0][0]));
        }else if(rows.length > 1){
            Logger.error(repositoryName, fnName, ErrMsg.MANY_FOUND(recordName));
            return GenericCallback(ErrMsg.createError(DB_ERROR, ErrMsg.MANY_FOUND(recordName)), null);
        }else if(rows.length == 0) {
            Logger.error(repositoryName, fnName, ErrMsg.NOT_FOUND(recordName));
            return GenericCallback(ErrMsg.createError(DB_ERROR, ErrMsg.NOT_FOUND(recordName)), null);
        }
    });
};