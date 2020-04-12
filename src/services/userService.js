const conn = require('../../db/db');
const User = require('../models/user.json');
const dbHelper = require('../../db/query-generator');

function findAll() {
    const query = 'SELECT ' + User[0].idColumn + ',' + User[1].userName + ',' + User[1].userEmail + ' FROM ' + User[0].table + ';';
    return new Promise((resolve, reject) => {
        conn.db.query(query, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        });
    });
}

function findById(req, res, id) {
    const query = 'SELECT ' + User[0].idColumn + ',' + User[1].userName + ',' + User[1].userEmail + ' FROM ' + User[0].table + ' WHERE ' + User[0].idColumn 
    + '=' + conn.escape(id) + ';';
    return new Promise((resolve, reject) => {
        conn.db.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


function findByUserEmail(req, res, email) {
    const query = 'SELECT ' + User[0].idColumn
        + ' FROM ' + User[0].table + ' WHERE ' + User[1].userEmail + '=' + conn.escape(email) + ";";
    return new Promise((resolve, reject) => {
        conn.db.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
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
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


function save(req, res, data) {
    let query = dbHelper.save(User, data);
    return new Promise((resolve, reject) => {
        conn.db.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function update(req, res, data, id) {
    let query = dbHelper.update(User, data, id);
    return new Promise((resolve, reject) => {
        conn.db.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
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
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function remove(req, res, id) {
    let query = dbHelper.delete(User, id);
    return new Promise((resolve, reject) => {
        conn.db.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
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
    Remove: remove,
    FindEmail:findByUserEmail
};

