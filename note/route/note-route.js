const express = require('express');
const router = express.Router();
const process = require('../service/note-service');

router.get('/', function(req, res) {
    process.findAll(req, res).then();
});

router.get('/:id', function(req, res) {
    process.findById(req, res);
});

router.get('/user/:id', function(req, res) {
    process.user(req, res);
});

router.post('/', function(req, res) {
    process.save(req, res).then();
});

/*
router.put('/:id', function(req, res) {
    process.modifyById(req, res).then();
});

router.delete('/:id', function(req, res) {
    process.removeById(req, res).then();
});
*/

module.exports = router;