'use strict'

const express = require('express');
const router = express.Router();
const process = require('../controllers/userController');
const middleware = require('../middleware/auth-middleware');
const Logger = require('../../helpers/logger');

const LOGGER = new Logger(__filename);

router.get('/', middleware.authMiddleware, (req, res) => {
    process.findAll(req, res).then();
});

router.get('/:id', middleware.authMiddleware, (req, res) => {
    process.findById(req, res).then();
});

router.post('/login', (req, res) => {
    LOGGER.info(`Request Received: ${JSON.stringify(req.body)}`);
    process.login(req, res).then();
});

router.post('/', (req, res) => {
    process.save(req, res).then();
});

router.post('/reset', middleware.authMiddleware, (req, res) => {
    process.reset(req, res).then();
});

router.delete('/:id', middleware.authMiddleware, (req, res) => {
    process.remove(req, res).then();
});


module.exports = router;
