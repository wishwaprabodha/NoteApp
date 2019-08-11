const jwt = require('jsonwebtoken');
const jwt_options = require('../config/options');
const util = require('util');



module.exports.authMiddleware = (req, res, next) => {
    console.log(req.headers['authorization']);
    if (req.headers['authorization']) {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            req.token = token;
            next();
        } else {
            res.sendStatus(403);
        }
    } else {
        res.status(403).send({
            ERROR: 'forbidden'
        })
    }
};