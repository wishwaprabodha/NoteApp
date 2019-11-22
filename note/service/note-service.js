const data = require('../data/note-data');


async function find(req, res) {
    let output = {};
    try {
        output.data = await data.get(req, res);
        output.metadata = { massage: output.data.length + " rows retrieved." };
        if (output.data.length === 0) {
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

async function search(req, res) {
    let output = {};
    let id = req.params.id;
    try {
        output.data = await data.search(req, res, id);
        output.metadata = { massage: "Note Id: " + id + " Retrieved." };
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


async function searchByUser(req, res) {
    let output = {};
    let id = req.params.id;
    try {
        output.data = await data.user(req, res, id);
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


async function add(req, res) {
    let output = {};
    let obj = {
        noteId: req.body.noteId,
        userId: req.body.userId,
        noteDate: req.body.noteDate,
        noteTopic: req.body.noteTopic,
        note: req.body.note
    };
    try {
        output.data = await data.add(req, res, obj);
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
        output.data = await data.edit(req, res, obj, id);
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

async function deleteData(req, res) {
    let output = {};
    let id = req.params.id;
    try {
        output.data = await data.delete(req, res, id);
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
    findAll: find,
    findById: search,
    save: add,
    modifyById: update,
    removeById: deleteData,
    user: searchByUser
};
