const jwt = require('jsonwebtoken');
const systemConfig = require('./config.json');


const secretKey = systemConfig.session.jwtSecret;


module.exports.authMiddleware = (req, res, next) => {
    if (req.headers['authorization']) {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            let decodeToken = jwt.decode(token,{complete: true});
            if (token.payload.secret === secretKey) {
                req.token = token;
                next();
            }
        } else {
            res.sendStatus(403);
        }
    } else {
        res.status(403).send({
            ERROR: 'forbidden'
        })
    }
};