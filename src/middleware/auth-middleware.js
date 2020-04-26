const jwt = require('jsonwebtoken');
const systemConfig = require('./config.json');
const userService = require('../services/userService');

// Encrypt all the data before sending

const secretKey = systemConfig.session.jwtSecret;


module.exports.authMiddleware = async (req, res, next) => {
    if (req.headers['authorization']) {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            try {
                let decodeToken = jwt.decode(token, { complete: true });
                let userData = await userService.FindById(decodeToken.payload.userId);
                if (userData) {
                    req.token = token;
                    next();
                } else {
                    res.status(401).send({
                        ERROR: 'Unauthorized'
                    })
                }
            } catch (e) {
                res.status(406).send({
                    ERROR: 'Invalid Token'
                })
            }

        }
    } else {
        res.status(403).send({
            ERROR: 'Forbidden'
        })
    }
};

module.exports.getLoggedUser = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
            let decodeToken = jwt.decode(token, { complete: true });
            console.log('catch: ' + decodeToken.payload.userId);
            return decodeToken.payload.userId;
        }
};
