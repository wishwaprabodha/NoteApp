
const conn = require('../../db/db');
const User = require('../models/user');
/*
function findAll(req, res) {
    const query = 'SELECT ' + User.mappings.columns.userId + ',' + User.mappings.columns.userName + User.mappings.columns.userEmail + ' FROM ' + User.mappings.table +  ";";
    return new Promise((resolve, reject) => {
        conn.db.query(query, (err, result) => {
            if (err) {
                reject(err, function() {
                    res.status(200).send({
                        'ERROR': err,
                    })
                });
            } else {
                resolve(result, function() {
                    return result;
                });
            }
        });
    });
}

function findById(req, res, id) {
    const query = 'SELECT ' + User.mappings.columns.userId + ',' + User.mappings.columns.userName + ',' + User.mappings.columns.userEmail + ' FROM ' + User.mappings.table + ' WHERE ' + User.mappings.columns.userId + '=' + conn.escape(id) + ";";
    return new Promise((resolve, reject) => {
        conn.db.query(query, (err, result) => {
            if (err) {
                reject(err, function() {
                    res.status(200).send({
                        'ERROR': err,
                    })
                });
            } else {
                resolve(result, function() {
                    return result;
                });
            }
        });
    });
}

function login(req, res, email) {
    const query = 'SELECT ' + User.mappings.columns.userId + ',' + User.mappings.columns.userName + ',' + User.mappings.columns.userEmail + ',' + User.mappings.columns.userPasswordHash
        + ' FROM ' + User.mappings.table + ' WHERE ' + User.mappings.columns.userEmail + '=' + conn.escape(email) + ";";
    return new Promise((resolve, reject) => {
        conn.db.query(query, (err, result) => {
            if (err) {
                reject(err, function() {
                    res.status(200).send({
                        'ERROR': err,
                    })
                });
            } else {
                resolve(result, function() {
                    return result;
                });
            }
        });
    });
}


function save(req, res, data) {
   let query = 'INSERT INTO ' + User.mappings.table + '(' + User.mappings.columns.userName + ',' + User.mappings.columns.userEmail + ',' + User.mappings.columns.userPasswordHash +')VALUES(' + conn.escape(data.userName) + ','
    + conn.escape(data.userEmail) + ',' + conn.escape(data.userPasswordHash) + ")";
    return new Promise((resolve, reject) => {
        conn.db.query(query, (err, result) => {
            if (err) {
                reject(err, function() {
                    res.status(200).send({
                        'ERROR': err,
                    })
                });
            } else {
                resolve(result, function() {
                    return result;
                });
            }
        });
    });
}

function update(req, res, data, id) {
    let query = 'UPDATE ' + User.mappings.table +  SET userName=" + conn.escape(data.userName) + ",userEmail=" + conn.escape(data.userEmail) +
        " WHERE userId=" + conn.escape(id) + ";";
    return new Promise((resolve, reject) => {
        conn.db.query(query, [data.userName, data.userName, id],
            (err, result) => {
                if (err) {
                    reject(err, function() {
                        res.status(200).send({
                            'ERROR': err,
                        })
                    });
                } else {
                    resolve(result, function() {
                        return result;
                    });
                }
            });
    });
}

function resetData(req, res, data) {
    let query = "UPDATE User SET userPasswordHash=" + conn.escape(data.userPasswordHash) + " WHERE userEmail=" +
        conn.escape(data.userEmail) + ";";
    return new Promise((resolve, reject) => {
        conn.db.query(query, (err, result) => {
            if (err) {
                reject(err, function() {
                    res.status(200).send({
                        'ERROR': err,
                    })
                });
            } else {
                resolve(result, function() {
                    return result;
                });
            }
        });
    });
}

function deleteData(req, res, id) {
    let query = "DELETE FROM User WHERE userId =" + conn.escape(id) + ";";
    return new Promise((resolve, reject) => {
        conn.db.query(query, (err, result) => {
            if (err) {
                reject(err, function() {
                    res.status(200).send({
                        'ERROR': err,
                    })
                });
            } else {
                resolve(result, function() {
                    return result;
                });
            }
        });
    });
}


module.exports = {
    get: getData,
    add: addData,
    edit: editData,
    search: searchData,
    reset: resetData,
    login: loginData,
    delete: deleteData
};
*/
