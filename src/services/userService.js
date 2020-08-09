'use strict'

const Mysql = require('../../helpers/mysql');
const Mapper = require('../mappers/userMapper');


exports.findAll = () => {
    return new Promise((resolve, reject) => {
        Mysql.connect.query(Mapper.findAll(), (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        });
    });
};

exports.findById = (id) => {
    return new Promise((resolve, reject) => {
        Mysql.connect.query(Mapper.findById(id), (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.findByUserEmail = (email) => {
    return new Promise((resolve, reject) => {
        Mysql.connect.query(Mapper.findByUserEmail(email), (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};


exports.login = (email) => {
    return new Promise((resolve, reject) => {
        Mysql.connect.query(Mapper.login(email), (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};


exports.save = (data) => {
    return new Promise((resolve, reject) => {
        Mysql.connect.query(Mapper.save(data), (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.update = (data, id) => {
    return new Promise((resolve, reject) => {
        Mysql.connect.query(Mapper.update(data, id), (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.reset = (data) => {
    return new Promise((resolve, reject) => {
        Mysql.connect.query(Mapper.reset(data), (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.remove = (id) => {
    return new Promise((resolve, reject) => {
        Mysql.connect.query(Mapper.delete(id), (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

