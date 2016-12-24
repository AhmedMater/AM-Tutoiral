/**
 * Created by ahmed.motair on 12/18/2016.
 */

var DB = rootRequire('AM-Database');
var async = require('async');

var SystemParam = rootRequire('SystemParameters');
var ErrMsg = rootRequire('ErrorMessages');
var Logger = rootRequire('Logger');
var DB_ERROR = SystemParam.DATABASE_ERROR;

var exports = module.exports = {};

exports.setCondition = function(fieldName, value, operator, type, dateFrom, dateTo){
    return {
        fieldName: fieldName,
        operator: (operator) ? operator : null,
        value: (value) ? value : null,
        type: (type) ? type : null,
        from: (dateFrom) ? dateFrom : null,
        to: (dateTo) ? dateTo : null
    };
};
exports.createSQLDate = function(dateObj){
    return dateObj.year + "-" + dateObj.month + "-" + dateObj.day;
};
var createSQLDateCondition = function(fieldName, from, to){
    if(from != null){
        if(to != null)
            return "DATE(`" + fieldName + "`)" + " BETWEEN " + DB.escape(from) + " AND " + DB.escape(to);
        else
            return "DATE(`" + fieldName + "`)" + " > " + DB.escape(from) ;
    }else{
        if(to != null)
            return "DATE(`" + fieldName + "`)" + " < " + DB.escape(to);
        else
            return null;
    }
};
var createSQLCondition = function(condition){
    if(condition.type == "date")
        return createSQLDateCondition(condition.fieldName, condition.from, condition.to);
    else if(condition.value != null)
        if (condition.type == "boolean")
            return condition.fieldName + " " + ((condition.operator) ? condition.operator : "=")
                + " " + ((condition.value) ? DB.escape("1") : DB.escape("0"));
        else
            return condition.fieldName + " " + ((condition.operator) ? condition.operator : "=")
                + " " + DB.escape(condition.value);
    else
        return null;
};

/**
 * It's a DB Utility function responsible for constructing the WHERE statement for a selecting Query
 * It loops over the conditions and create the condition SQL statement, then concatenate them into the WHERE statement
 * @param conditions As an array of condition Objects (fieldName, value, operator[=, LIKES], type[date, boolean], dateFrom, dateTo)
 * @param DBUtilityCallback
 * @returns String - String - WHERE statement <br/> - null - if the conditions are all nulls
 */
exports.constructWhereStatement = function(conditions, DBUtilityCallback){
    if(conditions.length == 0)
        return DBUtilityCallback(null, null);

    var fullConditions = [];

    for(var i=1; i<conditions.length; i++) {
        var conditionStr = createSQLCondition(conditions[i]);

        if (conditionStr != null)
            fullConditions.push(conditionStr);
    }

    var statement = "WHERE " + fullConditions[0];

    for(var i=1; i<fullConditions.length; i++)
        statement += " AND " + fullConditions[i];

    return DBUtilityCallback(null, statement);
};

/**
 * It's a DB Utility function responsible for inserting a new Record in the Database
 * @param query The Insert SQL Statement
 * @param data The data of the Record as a JSON with keys equal to the column names
 * @param repositoryName - The Repository Class Name that using this function
 * @param fnName The Repository function name using this function
 * @param modelName The Repository Model name
 * @param GenericCallback
 * @return Integer - ID of the record inserted <br/> - -1 if no records inserted
 * @throws DBError - If Transactional Error happens
 * @throws DBError - If SQL Error happens
 * @throws DBError - If Commit Error happens
 * @throws DBError - If More than One record Inserted (Rollback)
 */
exports.insertRecord = function(query, data, repositoryName, fnName, modelName, GenericCallback){
    DB.beginTransaction(function(transactionError) {
        // in case of Transaction Error
        if (transactionError) {
            Logger.error(repositoryName, fnName, transactionError.message);
            return GenericCallback(ErrMsg.createError(DB_ERROR, transactionError.message), null);
        }

        DB.query(query, data, function (err, rows, fields) {
            // in case of an Error
            if (err != null) {
                Logger.error(repositoryName, fnName, err.message);
                return GenericCallback(ErrMsg.createError(DB_ERROR, err.message), null);
            }

            // in case of inserting one record
            else if (rows.affectedRows == 1) {
                DB.commit(function (commitError) {
                    if (commitError) {
                        return DB.rollback(function () {
                            Logger.error(repositoryName, fnName, commitError.message);
                            Logger.debug(repositoryName, fnName, ErrMsg.TRANS_ROLLBACK);
                            return GenericCallback(ErrMsg.createError(DB_ERROR, commitError.message), null);
                        });
                    }
                    Logger.debug(repositoryName, fnName, ErrMsg.IS_INSERTED(modelName));
                    return GenericCallback(null, rows.insertId);
                });
            }

            // in case of inserting more than one record
            else if (rows.affectedRows == 0) {
                Logger.debug(repositoryName, fnName, ErrMsg.NOT_INSERTED(modelName));
                //return GenericCallback(ErrMsg.createError(DB_ERROR, ErrMsg.NOT_INSERTED(modelName)), null);
                return GenericCallback(null, -1);
            }

            // in case of inserting More than one record
            else if (rows.affectedRows > 1) {
                return DB.rollback(function () {
                    Logger.error(repositoryName, fnName, ErrMsg.MANY_INSERTED(modelName));
                    Logger.debug(repositoryName, fnName, ErrMsg.TRANS_ROLLBACK);
                    return GenericCallback(ErrMsg.createError(DB_ERROR, ErrMsg.MANY_INSERTED(modelName)), null);
                });
            }
        });
    });
};

/**
 * It's a DB Utility function responsible for deleting a record from the Database
 * @param query The Delete SQL Statement
 * @param repositoryName - The Repository Class Name that using this function
 * @param fnName The Repository function name using this function
 * @param modelName The Repository Model name
 * @param GenericCallback
 * @return Boolean - true if One record is deleted successfully <br/>
 *                 - false if no records are deleted
 * @throws DBError - If Transactional Error happens
 * @throws DBError - If SQL Error happens
 * @throws DBError - If Commit Error happens
 * @throws DBError - If More than one record is deleted (Rollback)
 */
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

/**
 * It's a DB Utility function responsible for updating a record in the Database
 * @param query The Update SQL Statement
 * @param attributes The new Values to be updated in the Database
 * @param repositoryName - The Repository Class Name that using this function
 * @param fnName The Repository function name using this function
 * @param modelName The Repository Model name
 * @param GenericCallback
 * @return Boolean - true if One record is updated successfully <br/>
 *                 - false if no records are updated
 * @throws DBError - If Transactional Error happens
 * @throws DBError - If SQL Error happens
 * @throws DBError - If Commit Error happens
 * @throws DBError - If More than one record is updated (Rollback)
 * @throws DBError - If new values are the same in the Database
 */
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

/**
 * It's a DB Utility function responsible for checking a record is found in the Database
 * @param query The SELECT SQL Statement
 * @param repositoryName - The Repository Class Name that using this function
 * @param fnName The Repository function name using this function
 * @param modelName The Repository Model name
 * @param GenericCallback
 * @return Boolean - true if record found <br/> - false if record isn't found
 * @throws DBError - If Transactional Error happens
 */
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
            Logger.error(repositoryName, fnName, ErrMsg.ALL_SELECTED(modelName));
            return GenericCallback(null, rows);
        }
    });
};

exports.multiRecordInsert = function(query, records, repositoryName, fnName, modelName, GenericCallback){
    DB.query(query, records, function (err, rows, fields) {
        // in case of an Error
        if (err != null) {
            Logger.error(repositoryName, fnName, err.message);
            return GenericCallback(ErrMsg.createError(DB_ERROR, err.message), null);
        }

        // in case of inserting one record
        else if(rows.affectedRows >= 1){
            Logger.debug(repositoryName, fnName, ErrMsg.ALL_INSERTED(modelName));
            return GenericCallback(null, true);
        }

        // in case of inserting more than one record
        else{
            Logger.error(repositoryName, fnName, ErrMsg.NOT_INSERTED(modelName));
            return GenericCallback(null, false);
        }
    });
};

exports.multiTableInsert = function(queries, repositoryName, fnName, GenericCallback){
    DB.beginTransaction(function(transactionError) {
        // in case of Transaction Error
        if (transactionError) {
            Logger.error(repositoryName, fnName, transactionError.message);
            return GenericCallback(ErrMsg.createError(DB_ERROR, transactionError.message), null);
        }

        DB.query(queries[0].query, queries[0].attributes, function (queryError, rows, fields) {
            // in case of an Error
            if (queryError != null) {
                Logger.error(repositoryName, fnName, queryError.message);
                return GenericCallback(ErrMsg.createError(DB_ERROR, queryError.message), null);
            }

            // in case of no records inserted
            else if (rows.affectedRows == 0) {
                Logger.error(repositoryName, fnName, ErrMsg.NOT_INSERTED(queries[0].modelName));
                return GenericCallback(ErrMsg.createError(DB_ERROR, ErrMsg.NOT_INSERTED(queries[0].modelName)), null);
            }

            // in case of inserting more than one record
            else if (rows.affectedRows > 1) {
                Logger.error(repositoryName, fnName, ErrMsg.MANY_INSERTED(queries[0].modelName));
                return GenericCallback(ErrMsg.createError(DB_ERROR, ErrMsg.MANY_INSERTED(queries[0].modelName)), null);
            }

            // in case of inserting one record
            else if (rows.affectedRows == 1) {
                Logger.debug(repositoryName, fnName, ErrMsg.IS_INSERTED(queries[0].modelName));
                var recordID = rows.insertId;
                var failed = false;
                var totalErrors = [];

                queries.forEach(function(item, index, array){
                    if(item.attributes == null)
                        Logger.debug(repositoryName, fnName, ErrMsg.NOT_INSERTED(item.modelName));
                    else if(index != 0) {
                        item.attributes.forEach(function (element) {
                            element.push(recordID);
                        });

                        DB.query(item.query, [item.attributes], function (queryError2, rows2, fields) {
                            // in case of an Error
                            if (queryError2 != null) {
                                failed = true;
                                Logger.error(repositoryName, fnName, queryError2.message);
                                totalErrors.push(queryError2.message);
                                if(index == array.length - 1 && failed)
                                    return DB.rollback(function () {
                                        Logger.debug(repositoryName, fnName, ErrMsg.TRANS_ROLLBACK);
                                        return GenericCallback(ErrMsg.createError(DB_ERROR, totalErrors), null);
                                    });
                            }

                            // in case of inserting more than one record
                            else if (rows2.affectedRows >= 1) {
                                Logger.debug(repositoryName, fnName, ErrMsg.ALL_INSERTED(item.modelName));
                                if (index == array.length - 1 && !failed) {
                                    DB.commit(function (commitError) {
                                        if (commitError) {
                                            return DB.rollback(function () {
                                                Logger.error(repositoryName, fnName, commitError.message);
                                                Logger.debug(repositoryName, fnName, ErrMsg.TRANS_ROLLBACK);
                                                return GenericCallback(ErrMsg.createError(DB_ERROR, commitError.message), null);
                                            });
                                        }else{
                                            Logger.debug(repositoryName, fnName, ErrMsg.FULL_INSERTED(array[0].modelName));
                                            return GenericCallback(null, true);
                                        }
                                    });
                                }
                            }

                            // in case of no records inserted
                            else if (rows2.affectedRows == 0) {
                                return DB.rollback(function () {
                                    Logger.error(repositoryName, fnName, ErrMsg.NOT_INSERTED(item.modelName));
                                    Logger.debug(repositoryName, fnName, ErrMsg.TRANS_ROLLBACK);
                                    return GenericCallback(ErrMsg.createError(DB_ERROR, ErrMsg.NOT_INSERTED(item.modelName)), null);
                                });
                            }
                        });
                    }
                });
            }
        });
    });
};
