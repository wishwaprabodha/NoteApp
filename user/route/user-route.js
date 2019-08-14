const express = require('express');
const router = express.Router();
const process = require('../service/user-service');
const middleware = require('../../middleware/auth-middleware');
const jwt = require('jsonwebtoken');


router.get('/', middleware.authMiddleware, function(req, res) {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.status(403).send({
                err: 'forbidden'
            });
        } else {
           // console.log('user is: ',authData.data[0].userId);
            process.findAll(req, res).then();
        }
    });
});

router.get('/:id', function(req, res) {
    console.log(req.param.id);
    process.findById(req, res);
});

router.post('/login', function(req, res) {
    process.login(req, res).then();
});

router.post('/', function(req, res) {
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