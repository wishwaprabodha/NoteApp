'use strict'
const Notes = require('../models/note');
const DbHelper = require('../../helpers/query-generator');

exports.getNotesByUserId = (userId) => {
    const query = `SELECT * FROM ${Notes.mappings.table} WHERE ${Notes.mappings.columns.userId} = ${db.escape(userId)};`;
    console.info(query);
    return query;
};

exports.findAll = () => {
    const query = DbHelper.findAll(Notes);
    console.info(query);
    return query;
};

exports.findById = (noteId) => {
    const query = DbHelper.findById(Notes, noteId);
    console.info(query);
    return query;
};

exports.delete = (noteId) => {
    const query = DbHelper.delete(noteId);
    console.info(query);
    return query;
};

exports.save = (noteData) => {
    const query = DbHelper.save(Notes, noteData);
    console.info(query);
    return query;
};

exports.update = (noteData, noteId) => {
    const query = DbHelper.save(Notes, noteData, noteId);
    console.info(query);
    return query;
};
