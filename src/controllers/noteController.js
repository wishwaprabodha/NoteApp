const noteService = require('../services/noteService');


async function findAll(req, res) {
    let output = {};
    try {
        output.data = await noteService.findAll();
        output.metadata = { massage: output.data.length + " rows retrieved." };
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

async function findById(req, res) {
    let output = {};
    let id = req.params.id;
    try {
        output.data = await noteService.findById(id);
        output.metadata = { massage: "Note Id: " + id + " Retrieved." };
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


async function findByUserId(req, res,id) {
    let output = {};
    try {
        output.data = await noteService.findByUserId(id);
        output.metadata = { massage: "User Id: " + id + " Notes Retrieved." };
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


async function save(req, res) {
    let output = {};
    let obj = {
        userId: req.body.userId,
        noteDate: req.body.noteDate,
        noteTopic: req.body.noteTopic,
        note: req.body.note
    };
    try {
        output.data = await noteService.save(obj);
        output.metadata = { massage: "Note Record Added. " };
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

async function update(req, res) {
    let output = {};
    let id = req.params.id;
    let obj = {
        noteId: req.body.noteId,
        userId: req.body.userId,
        noteDate: req.body.noteDate,
        noteTopic: req.body.noteTopic,
        note: req.body.note
    };
    try {
        output.data = await noteService.update(obj, id);
        output.metadata = { massage: "Note Id : " + id + " Updated." };
        if (!Object.keys(output.data).length) {
            res.status(200).send({
                'ERROR': 'Note Modification failed',
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

async function remove(req, res) {
    let output = {};
    let id = req.params.id;
    try {
        output.data = await noteService.remove(id);
        output.metadata = { massage: "User Id : " + id + " Deleted." };
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


module.exports = {
    findAll: findAll,
    findById: findById,
    save: save,
    update: update,
    remove: remove,
    findByUserId: findByUserId
};
