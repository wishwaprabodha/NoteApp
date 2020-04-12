const jwt = require('jsonwebtoken');
const systemConfig = require('./config.json');
const userService = require('../services/userService');



const secretKey = systemConfig.session.jwtSecret;


module.exports.authMiddleware = async (req, res, next) => {
    if (req.headers['authorization']) {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            try{
                let decodeToken = jwt.decode(token, { complete: true });
                let userData = await userService.FindById(req, res, decodeToken.payload.userId);
                console.log(userData);
                if (userData) {
                    req.token = token;
                    next();
                } else {
                    res.status(401).send({
                        ERROR: 'Unauthorized'
                    })
                }
            }catch(e){
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