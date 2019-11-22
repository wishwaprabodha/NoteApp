const conn = require('../../db/db');

function getData(req, res) {
    const query = "SELECT noteId,userId,noteDate,noteTopic,note from Note";
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

function getDataByUser(req, res, id) {
    const query = "SELECT Note.noteId,Note.userId,Note.noteDate,Note.noteTopic,Note.note FROM Note,User WHERE Note.userId=User.userId AND Note.userId=" + conn.escape(id) + ";";
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

function searchData(req, res, id) {
    const query = "SELECT noteId,userId,noteDate,noteTopic,note FROM Note WHERE noteId=" + conn.escape(id) + ";";
    return new Promise((resolve, reject) => {
        conn.db.query(query, (err, result) => {
            if (err) {
                reject(err, function() {
                    res.status(200).send({
                        'ERROR': err,
                    })
                });
            } else {
                resolve(result, () => {
                    return result;
                });
            }
        });
    });
}


function addData(req, res, data) {
    let query = "INSERT INTO Note(userId,noteDate,noteTopic,note)VALUES(" + conn.escape(data.userId) + "," +
        conn.escape(data.noteDate) + "," + conn.escape(data.noteTopic) + "," + conn.escape(data.note) + ")";
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

function editData(req, res, data, id) {
    let query = "UPDATE User SET noteDate=" + conn.escape(data.noteDate) + ",noteTopic=" + conn.escape(data.noteTopic) +
        ",note=" + conn.escape(data.note) + " WHERE noteId=" + conn.escape(id) + ";";
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
    let query = "DELETE FROM Note WHERE noteId =" + conn.escape(id) + ";";
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
    user: getDataByUser,
    delete: deleteData
};