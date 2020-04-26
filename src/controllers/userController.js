const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const systemConfig = require('../middleware/config.json');
const userService = require('../services/userService');


const secretKey = systemConfig.session.jwtSecret;

let token = '';

async function findAll(req, res) {
    let output = {};
    try {
        output.data = await userService.FindAll();
        output.metadata = { massage: output.data.length + " rows retrieved." };
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

async function findById(req, res) {
    let output = {};
    let id = req.params.id;
    try {
        output.data = await userService.FindById(id);
        output.metadata = { massage: "User Id: " + id + " Retrieved." };
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


async function login(req, res) {
    let output = {};
    let email = req.body.userEmail;
    try {
        output.data = await userService.Login(email);
        output.metadata = { massage: "User Email : " + email + " Retreived." };
        if (output.data.length === 0) {
            res.status(200).send({
                'ERROR': 'NO DATA FOUND',
            })
        } else {
            if (bcrypt.compareSync(req.body.userPasswordHash, output.data[0].userPasswordHash)) {
                token = jwt.sign({ userId: output.data[0].userId }, secretKey);
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

async function reset(req, res) {
    let output = {};
    try {
        let userData = await userService.FindEmail(req.body.userEmail);
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
            output.data = await userService.Reset(obj);
            output.metadata = { massage: "User Email : " + req.body.userEmail + " Password Reseted." };
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


async function save(req, res) {
    let output = {};
    let obj = {
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPasswordHash: bcrypt.hashSync(req.body.userPasswordHash, saltRounds)
    };
    try {
        let verify = await userService.FindEmail(obj.userEmail);
        if (verify.length > 0) {
            res.status(200).send({
                'ERROR': 'User email exists',
            })
        } else {
            output.data = await userService.Save(obj);
            output.metadata = { massage: "User Record Added." };
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
        output.data = await userService.Update(obj, id);
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

async function remove(req, res) {
    let output = {};
    let id = req.params.id;
    try {
        output.data = await userService.Remove(id);
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
    findAll: findAll,
    findById: findById,
    save: save,
    update: update,
    remove: remove,
    reset: reset,
    login: login
};
