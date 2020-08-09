'use strict'

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const systemConfig = require('../middleware/config.json');
const userService = require('../services/userService');


const secretKey = systemConfig.session.jwtSecret;

let token = '';

exports.findAll = async (req, res) => {
    let output = {};
    try {
        output.data = await userService.findAll();
        output.metadata = {massage: output.data.length + " rows retrieved."};
        if (output.data.length === 0) {
            res.status(200).send({
                'DATA': 'NO DATA FOUND',
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

exports.findById = async (req, res) => {
    let output = {};
    let id = req.params.id;
    try {
        output.data = await userService.findById(id);
        output.metadata = {massage: "User Id: " + id + " Retrieved."};
        if (!Object.keys(output.data).length) {
            res.status(200).send({
                'DATA': 'NO DATA FOUND',
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


exports.login = async (req, res) => {
    let output = {};
    let email = req.body.userEmail;
    try {
        output.data = await userService.login(email);
        output.metadata = {massage: "User Email : " + email + " Retrieved."};
        if (output.data.length === 0) {
            res.status(200).send({
                'ERROR': 'NO DATA FOUND',
            })
        } else {
            if (bcrypt.compareSync(req.body.userPasswordHash, output.data[0].userPasswordHash)) {
                token = jwt.sign({userId: output.data[0].userId}, secretKey, {expiresIn: '1h'});
                res.send({
                    status: 1,
                    userId: output.data[0].userId,
                    success: 'AUTHENTICATED',
                    token: token
                });
            } else {
                res.status(200).send({
                    status: 0,
                    error: 'INVALID PASSWORD',
                });
            }
        }
    } catch (e) {
        res.status(200).send({
            'ERROR': e,
        })
    }
}

exports.reset = async (req, res) => {
    let output = {};
    try {
        let userData = await userService.findByUserEmail(req.body.userEmail);
        if (!userData) {
            res.status(200).send({
                'ERROR': 'User email does not exist',
            });
        }
        let passphrase = req.body.userPasswordHash;
        let hashPassword = bcrypt.hashSync(passphrase, saltRounds);
        let obj = {
            userEmail: req.body.userEmail,
            userPasswordHash: hashPassword
        };
        try {
            output.data = await userService.reset(obj);
            output.metadata = {massage: "User Email : " + req.body.userEmail + " Password Reset."};
            if (output.data.affectedRows === 0) {
                res.status(200).send({
                    'ERROR': 'User modification failed',
                })
            } else {
                res.send(output);
            }
        } catch (e) {
            res.status(200).send({
                'ERROR': e,
            })
        }
    } catch (error) {
        console.error(error);
        res.status(200).send({
            error: error
        });
    }
}


exports.save = async (req, res) => {
    let output = {};
    try {
        const verifyUser = await userService.findByUserEmail(req.body.userEmail);
        if (verifyUser.length > 0) {
            res.status(200).send({
                'ERROR': 'User email exists',
            });
        } else {
            const obj = {
                userId: req.body.userId,
                userName: req.body.userName,
                userEmail: req.body.userEmail,
                userPasswordHash: bcrypt.hashSync(req.body.userPasswordHash, saltRounds)
            };
            console.log('id: ' + obj.userId);
            if (obj.userId) {
                output.data = await userService.update(obj);
                output.metadata = {massage: "User Id : " + id + " Updated."};
            } else {
                output.data = await userService.save(obj);
                output.metadata = {massage: "User Record Added."};
            }
            if (!Object.keys(output.data).length) {
                res.status(200).send({
                    'ERROR': 'User Insertion failed',
                })
            } else {
                res.send(output);
            }
        }
    } catch (e) {
        res.status(200).send({
            'ERROR': e.massage,
        })
    }
}

exports.remove = async (req, res) => {
    let output = {};
    let id = req.params.id;
    try {
        output.data = await userService.remove(id);
        output.metadata = {massage: "User Id : " + id + " Deleted."};
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

