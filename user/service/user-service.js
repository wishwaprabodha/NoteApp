const data = require('../data/user-data');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const jwt_options = require('../../config/options');
const uuidv1 = require('uuid/v1');
const uuidv4 = require('uuid/v4');
const saltRounds = 10;
let token = '';

async function find(req, res) {
    let output = {};
    try {
        output.data = await data.get(req, res);
        output.metadata = { massage: output.data.length + " rows retrieved." };
        if (output.data.length === 0) {
            res.status(200).send({
                'ERROR': 'NO DATA FOUND',
            })
        } else {
            res.send(output);
        }
    } catch (e) {
        res.status(200).send({
            'ERROR': e,
        })
    }
}

async function search(req, res) {
    let output = {};
    let id = req.params.id;
    try {
        output.data = await data.search(req, res, id);
        output.metadata = { massage: "User Id: " + id + " Retrieved." };
        if (!Object.keys(output.data).length) {
            res.status(200).send({
                'ERROR': 'NO DATA FOUND',
            })
        } else {
            res.send(output);
        }
    } catch (e) {
        res.status(200).send({
            'ERROR': e,
        })
    }
}


async function loginData(req, res) {
    let output = {};
    let email = req.body.userEmail;
    try {
        output.data = await data.login(req, res, email);
        output.metadata = { massage: "User Email : " + email + " Retreived." };
        if (output.data.length === 0) {
            res.status(200).send({
                'ERROR': 'NO DATA FOUND',
            })
        } else {
            if (bcrypt.compareSync(req.body.userPasswordHash, output.data[0].userPasswordHash)) {
                token = jwt.sign({ data: output.data }, 'secretKey');
                res.send({
                    STATUS: 1,
                    'SUCCESS': 'AUTHENTICATED',
                    Token: token
                });
            } else {
                res.status(200).send({
                    STATUS: 0,
                    'ERROR': 'INVALID PASSWORD',
                })
            }
        }
    } catch (e) {
        res.status(200).send({
            'ERROR': e,
        })
    }
}

async function resetData(req, res) {
    let output = {};
    let passphrase = req.body.userPasswordHash;
    let hashPassword = bcrypt.hashSync(passphrase, saltRounds);
    let obj = {
        userEmail: req.body.userEmail,
        userPasswordHash: hashPassword
    };
    console.log(obj);
    try {
        output.data = await data.reset(req, res, obj);
        output.metadata = { massage: "User Email : " + req.body.userEmail + " Password Reseted." };
        if (output.data.affectedRows === 0) {
            res.status(200).send({
                'ERROR': 'User Modification failed',
            })
        } else {
            res.send(output);
        }
    } catch (e) {
        res.status(200).send({
            'ERROR HERE': e,
        })
    }
}



async function add(req, res) {
    let output = {};
    let passphrase = req.body.userPasswordHash;
    let hashPassword = bcrypt.hashSync(passphrase, saltRounds);
    let obj = {
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPasswordHash: hashPassword
    };
    try {
        output.data = await data.add(req, res, obj);
        output.metadata = { massage: "User Record Added." };
        if (!Object.keys(output.data).length) {
            res.status(200).send({
                'ERROR': 'User Insertion failed',
            })
        } else {
            res.send(output);
        }
    } catch (e) {
        res.status(200).send({
            'ERROR': e,
        })
    }
}

async function update(req, res) {
    let output = {};
    let id = req.params.id;
    let obj = {
        userName: req.body.userName,
        userEmail: req.body.userEmail,
    };
    try {
        output.data = await data.edit(req, res, obj, id);
        output.metadata = { massage: "User Id : " + id + " Updated." };
        if (!Object.keys(output.data).length) {
            res.status(200).send({
                'ERROR': 'User Modification failed',
            })
        } else {
            res.send(output);
        }
    } catch (e) {
        res.status(200).send({
            'ERROR': e,
        })
    }
}

async function deleteData(req, res) {
    let output = {};
    let id = req.params.id;
    try {
        output.data = await data.delete(req, res, id);
        output.metadata = { massage: "User Id : " + id + " Deleted." };
        if (output.data.affectedRows === 0) {
            res.status(200).send({
                'ERROR': 'User Deletion failed',
            })
        } else {
            res.send(output);
        }
    } catch (e) {
        res.status(200).send({
            'ERROR': e,
        })
    }
}



module.exports = {
    findAll: find,
    findById: search,
    save: add,
    modifyById: update,
    removeById: deleteData,
    reset: resetData,
    login: loginData,
    Token: token
};