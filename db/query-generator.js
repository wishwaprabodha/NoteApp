const modelUser = require('../src/models/users.json');
const db = require('/db/db');

exports.findAll = function (model) {
    return 'SELECT * FROM ' + model[0].table + ';';
};

exports.findById = function (model, idColumn) {
    return 'SELECT * FROM ' + model[0].table + ' WHERE ' + model[0].idColumn + '=' + db.escape(idColumn) + ';';
};

exports.delete = function (model, idColumn) {
    return 'DELETE FROM ' + model[0].table + ' WHERE ' + model[0].idColumn + '=' + db.escape(idColumn) + ';';
};

exports.save = function (model, idColumn) {
    return 'DELETE FROM ' + model[0].table + ' WHERE ' + model[0].idColumn + '=' + db.escape(idColumn) + ';';
};

findX = function (model) {
    const _query = 'SELECT * FROM ';
    const _table = model[0].table;
    const _columns = model[1];
    let columns = [];
    for (let key in _columns) {
        columns.push(_columns[key]);
    }
    console.log(_query + _table);
    for (let col in columns) {
        console.log(columns[col])
    }
};

console.log(findAll(modelUser));

findX(modelUser);
