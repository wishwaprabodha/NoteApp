const express = require('express');
const router = express.Router();
const process = require('../controllers/noteController');
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
    jwt.verify(req.token, secretKey, (err) => {
        if (err) {
            res.status(403).send({
                err: 'forbidden'
            });
        } else {
            process.findById(req, res).then();
        }
    });
});

router.get('/user/:id', middleware.authMiddleware, (req, res) => {
    jwt.verify(req.token, secretKey, (err) => {
        if (err) {
            res.status(403).send({
                err: 'forbidden'
            });
        } else {
            process.findByUserId(req, res).then();
        }
    });
});

router.post('/', middleware.authMiddleware, (req, res) => {
    jwt.verify(req.token, secretKey, (err) => {
        if (err) {
            res.status(403).send({
                err: 'forbidden'
            });
        } else {
            process.save(req, res).then();
        }
    });
});

router.put('/:id', middleware.authMiddleware, (req, res) => {
    jwt.verify(req.token, secretKey, (err) => {
        if (err) {
            res.status(403).send({
                err: 'forbidden'
            });
        } else {
            process.update(req, res).then();
        }
    });
});

router.delete('/:id', middleware.authMiddleware, (req, res) => {
    jwt.verify(req.token, secretKey, (err) => {
        if (err) {
            res.status(403).send({
                err: 'forbidden'
            });
        } else {
            process.remove(req, res).then();
        }
    });
});

module.exports = router;
