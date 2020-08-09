const jwt = require('jsonwebtoken');
const systemConfig = require('./config.json');
const userService = require('../services/userService');
// Encrypt all the data before sending
const secretKey = systemConfig.session.jwtSecret;

exports.authMiddleware = async (req, res, next) => {
    if (req.headers['authorization']) {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            try {
                let decodedToken = jwt.verify(token, secretKey);
                let userData = await userService.findById(decodedToken.userId);
                if (userData) {
                    req.token = token;
                    next();
                } else {
                    res.status(401).send({
                        ERROR: 'Unauthorized'
                    })
                }
            } catch (err) {
                res.status(406).send({
                    ERROR: err
                })
            }

        }
    } else {
        res.status(403).send({
            ERROR: 'Forbidden'
        })
    }
};

exports.getLoggedUser = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
        let decodeToken = jwt.decode(token, secretKey);
        return decodeToken.userId;
    }
};
