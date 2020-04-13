const express = require('express');
const router = express.Router();
const process = require('../controllers/noteController');
const middleware = require('../middleware/auth-middleware');
const systemConfig = require('../middleware/config.json');

const secretKey = systemConfig.session.jwtSecret;

// Make all filtered by logged userId

router.get('/', middleware.authMiddleware, (req,res) => {
    let id = middleware.getLoggedUser(req);
    process.findByUserId(req,res,id).then();
});

router.get('/:id', middleware.authMiddleware, (req, res) => {
    process.findById(req, res).then();
});

router.get('/user/:id', middleware.authMiddleware, (req, res) => {
    process.findByUserId(req, res).then();
});

router.post('/', middleware.authMiddleware, (req, res) => {
    process.save(req, res).then();
});

router.put('/:id', middleware.authMiddleware, (req, res) => {
    process.update(req, res).then();
});

router.delete('/:id', middleware.authMiddleware, (req, res) => {
    process.remove(req, res).then();
});

module.exports = router;
