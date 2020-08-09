'use strict'

const Mysql = require('mysql');

function escape(value) {
    return Mysql.escape(value);
}

exports.findAll = (model) => {
    return `SELECT * FROM ${model.mappings.table};`;
};

exports.findById = (model, idColumn) => {
    return `SELECT * FROM ${model.mappings.table} WHERE ${model.mappings.idColumn} = ${escape(idColumn)};`;
};


exports.delete = (model, idColumn) => {
    return `DELETE FROM ${model.mappings.table} WHERE ${model.mappings.idColumn} = ${escape(idColumn)};`;
};

exports.save = (model, obj) => {
    let _prefix = `INSERT INTO ${model.mappings.table} (`;
    const _columns = model.mappings.columns;
    let _query;
    for (let col in _columns) {
        if(col !== model.mappings.idColumn && !!obj[_columns[col]]){
            _prefix += `${_columns[col]},`;
        }
    }
    _query = _prefix.substring(0, _prefix.length - 1);
    _query += `) VALUES (`;
    for (let key in obj) {
        _query += `${escape(obj[key])},`;
    }
    return `${_query.substring(0, _query.length - 1)});`
};

exports.update = (model, obj, idColumn) => {
    let _prefix = `UPDATE ${model.mappings.table} SET `;
    const _columns = model.mappings.columns;
    let _query;
    for (let col in _columns) {
        if(col !== model.mappings.idColumn && !!obj[_columns[col]]){
            _prefix += `${_columns[col]} = ${escape(obj[_columns[col]])},`;
        }
    }
    _query = _prefix.substring(0, _prefix.length - 1);
    return `${_query} WHERE ${model.mappings.idColumn} = ${idColumn};`;
};

