const express = require('express');
const router = express.Router();
const process = require('../controllers/userController');
const middleware = require('../middleware/auth-middleware');
const jwt = require('jsonwebtoken');
const systemConfig = require('../middleware/config.json');


const secretKey = systemConfig.session.jwtSecret;

router.get('/', middleware.authMiddleware, (req, res) => {
    jwt.verify(req.token, secretKey, (err) => {
        if (err) {
            res.status(403).send({
                err: 'forbidden'
            });
        } else {
            process.findAll(req, res).then();
        }
    });
});

router.get('/:id', middleware.authMiddleware, (req, res) => {
    process.findById(req, res).then();
});

router.post('/login', function(req, res) {
    process.login(req, res).then();
});

router.post('/', middleware.authMiddleware, (req, res) => {
    process.save(req, res).then();
});

/*
router.post('/reset', function(req, res) {
    process.reset(req, res).then();
});

router.put('/:id', function(req, res) {
    process.modifyById(req, res).then();
});

router.delete('/:id', function(req, res) {
    process.removeById(req, res).then();
});
*/

module.exports = router;
