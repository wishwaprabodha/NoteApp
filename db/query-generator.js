const mysql = require('mysql');
const modelUser = require('../src/models/users.json');
const obj = {userName: 'Wishwa', userEmail: 2, userPasswordHash: 'hash'};

function escape(value) {
    return mysql.escape(value);
}

exports.findAll = (model) => {
    return 'SELECT * FROM ' + model[0].table + ';';
};

exports.findById = (model, idColumn) => {
    return 'SELECT * FROM ' + model[0].table + ' WHERE ' + model[0].idColumn + '=' + escape(idColumn) + ';';
};


exports.delete = (model, idColumn) => {
    return 'DELETE FROM ' + model[0].table + ' WHERE ' + model[0].idColumn + '=' + escape(idColumn) + ';';
};

exports.save = (model, obj) => {
    let _prefix = 'INSERT INTO ' + model[0].table + ' (';
    const _columns = model[1];
    let _query;
    for (let col in _columns) {
        _prefix += _columns[col] + ',';
    }
    _query = _prefix.substring(0, _prefix.length - 1);
    _query += ') VALUES (';
    for (let key in obj) {
        _query += escape(obj[key]) + ',';
    }
    _query = _query.substring(0, _query.length - 1);
    return _query + ');';
};

exports.update = (model, obj, idColumn) => {
    let _prefix = 'UPDATE ' + model[0].table + ' SET ';
    const _columns = model[1];
    let _query;
    for (let col in _columns) {
        _prefix += _columns[col] + '=' + escape(obj[_columns[col]]) + ',';
    }
    _query = _prefix.substring(0, _prefix.length - 1);
    _query += ' WHERE ' + model[0].idColumn + '=' + idColumn + ';';
    return _query;
};

