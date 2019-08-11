const conn = require('../../db/db');

function getData(req, res) {
    const query = "SELECT userId,userName,userEmail from User";
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
    const query = "SELECT userId,userName,userEmail FROM User WHERE userId=" + conn.escape(id) + ";";
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
    console.log(query);

}

function loginData(req, res, email) {
    const query = "SELECT userEmail,userPasswordHash FROM User WHERE userEmail=" + conn.escape(email) + ";";
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


function addData(req, res, data) {
    let query = "INSERT INTO User(userName,userEmail,userPasswordHash)VALUES(" + conn.escape(data.userName) + "," +
        conn.escape(data.userEmail) + "," + conn.escape(data.userPasswordHash) + ")";
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
    let query = "UPDATE User SET userName=" + conn.escape(data.userName) + ",userEmail=" + conn.escape(data.userEmail) +
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