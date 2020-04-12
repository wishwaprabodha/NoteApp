const conn = require('../../db/db');
const Note = require('../models/note.json');
const dbHelper = require('../../db/query-generator');

function findAll() {
    const query = dbHelper.findAll(Note);
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

function findByUserId(req, res, id) {
    const query = 'SELECT * FROM ' + Note[0].table + ' WHERE ' + Note[1].userId + '=' + conn.escape(id) + ';';
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

function findById(req, res, id) {
    const query = dbHelper.findById(Note, id);
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
    let query = dbHelper.save(Note, data);
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
    let query = dbHelper.update(Note, data, id);
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
    let query = dbHelper.delete(Note, id);
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
    findAll: findAll,
    save: save,
    update: update,
    findById: findById,
    findByUserId: findByUserId,
    remove: remove
};
