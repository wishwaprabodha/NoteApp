const conn = require('../../db/db');
const User = require('../models/user.json');
const dbHelper = require('../../db/query-generator');

function findAll(req, res) {
    const query = dbHelper.findAll(User);
    return new Promise((resolve, reject) => {
        conn.db.query(query, (err, result) => {
            if (err) {
                reject(err, function () {
                    res.status(200).send({
                        'ERROR': err,
                    })
                });
            } else {
                resolve(result, function () {
                    return result;
                });
            }
        });
    });
}

function findById(req, res, id) {
    const query = dbHelper.findById(User, id);
    return new Promise((resolve, reject) => {
        conn.db.query(query, (err, result) => {
            if (err) {
                reject(err, function () {
                    res.status(200).send({
                        'ERROR': err,
                    })
                });
            } else {
                resolve(result, function () {
                    return result;
                });
            }
        });
    });
}

function login(req, res, email) {
    const query = 'SELECT ' + User[0].idColumn + ',' + User[1].userName + ',' + User[1].userEmail + ',' + User[1].userPasswordHash
        + ' FROM ' + User[0].table + ' WHERE ' + User[1].userEmail + '=' + conn.escape(email) + ";";
    return new Promise((resolve, reject) => {
        conn.db.query(query, (err, result) => {
            if (err) {
                reject(err, function () {
                    res.status(200).send({
                        'ERROR': err,
                    })
                });
            } else {
                resolve(result, function () {
                    return result;
                });
            }
        });
    });
}


function save(req, res, data) {
    let query = dbHelper.save(User, data);
    return new Promise((resolve, reject) => {
        conn.db.query(query, (err, result) => {
            if (err) {
                reject(err, function () {
                    res.status(200).send({
                        'ERROR': err,
                    })
                });
            } else {
                resolve(result, function () {
                    return result;
                });
            }
        });
    });
}

function update(req, res, data, id) {
    let query = dbHelper.update(User, data, id);
    return new Promise((resolve, reject) => {
        conn.db.query(query, (err, result) => {
            if (err) {
                reject(err, function () {
                    res.status(200).send({
                        'ERROR': err,
                    })
                });
            } else {
                resolve(result, function () {
                    return result;
                });
            }
        });
    });
}

function reset(req, res, data) {
    let query = 'UPDATE ' + User[0].table + 'SET ' + User[1].userPasswordHash + '=' + conn.escape(data.userPasswordHash) + ' WHERE ' + User[1].userEmail + '='
        + conn.escape(data.userEmail) + ";";
    return new Promise((resolve, reject) => {
        conn.db.query(query, (err, result) => {
            if (err) {
                reject(err, function () {
                    res.status(200).send({
                        'ERROR': err,
                    })
                });
            } else {
                resolve(result, function () {
                    return result;
                });
            }
        });
    });
}

function remove(req, res, id) {
    let query = dbHelper.delete(User, id);
    return new Promise((resolve, reject) => {
        conn.db.query(query, (err, result) => {
            if (err) {
                reject(err, function () {
                    res.status(200).send({
                        'ERROR': err,
                    })
                });
            } else {
                resolve(result, function () {
                    return result;
                });
            }
        });
    });
}


module.exports = {
    FindAll: findAll,
    Save: save,
    Update: update,
    FindById: findById,
    Reset: reset,
    Login: login,
    Remove: remove
};

