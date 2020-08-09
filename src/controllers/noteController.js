const noteService = require('../services/noteService');
const middleware = require('../middleware/auth-middleware');

exports.findAll = async (req, res) => {
    let output = {};
    try {
        output.data = await noteService.findAll();
        output.metadata = {massage: output.data.length + " rows retrieved."};
        if (output.data.length === 0) {
            res.status(200).send({
                'DATA': 'NO DATA FOUND',
            })
        } else {
            res.send(output);
        }
    } catch (e) {
        res.status(200).send({
            'ERROR': e,
        })
    }
}

exports.findById = async (req, res) => {
    let output = {};
    let id = req.params.id;
    try {
        output.data = await noteService.findById(id);
        output.metadata = {massage: "Note Id: " + id + " Retrieved."};
        if (!Object.keys(output.data).length) {
            res.status(200).send({
                'DATA': 'NO DATA FOUND',
            })
        } else {
            res.send(output);
        }
    } catch (e) {
        res.status(200).send({
            'ERROR': e,
        })
    }
}

exports.findByUserId = async (req, res) => {
    let output = {};
    let id = req.params.id;
    try {
        output.data = await noteService.findByUserId(id);
        output.metadata = {massage: "User Id: " + id + " Notes Retrieved."};
        if (!Object.keys(output.data).length) {
            res.status(200).send({
                'ERROR': 'NO DATA FOUND',
            })
        } else {
            res.send(output);
        }
    } catch (e) {
        res.status(200).send({
            'ERROR': e,
        })
    }
}

exports.save = async (req, res) => {
    let output = {};
    let obj = {
        noteId: req.body.noteId,
        userId: middleware.getLoggedUser(req),
        noteDate: req.body.noteDate,
        noteTopic: req.body.noteTopic,
        note: req.body.note
    };
    try {
        if (obj.noteId.length > 0) {
            output.data = await noteService.update(obj);
            output.metadata = {massage: "Note Id : " + id + " Updated."};
        } else {
            output.data = await noteService.save(obj);
            output.metadata = {massage: "Note Record Added. "};
        }
        if (!Object.keys(output.data).length) {
            res.status(200).send({
                'ERROR': 'User Insertion failed',
            })
        } else {
            res.send(output);
        }
    } catch (e) {
        res.status(200).send({
            'ERROR': e,
        })
    }
}

exports.remove = async (req, res) => {
    let output = {};
    let id = req.params.id;
    try {
        output.data = await noteService.remove(id);
        output.metadata = {massage: "User Id : " + id + " Deleted."};
        if (output.data.affectedRows === 0) {
            res.status(200).send({
                'ERROR': 'User Deletion failed',
            })
        } else {
            res.send(output);
        }
    } catch (e) {
        res.status(200).send({
            'ERROR': e,
        })
    }
}
