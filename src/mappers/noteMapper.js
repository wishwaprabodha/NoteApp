'use strict'
const Notes = require('../models/note');
const DbHelper = require('../../helpers/query-generator');
const Logger = require('../../helpers/logger');

const LOGGER = new Logger(__filename);

exports.getNotesByUserId = (userId) => {
    const query = `SELECT * FROM ${Notes.mappings.table} WHERE ${Notes.mappings.columns.userId} = ${db.escape(userId)};`;
    LOGGER.info(query);
    return query;
};

exports.findAll = () => {
    const query = DbHelper.findAll(Notes);
    LOGGER.info(query);
    return query;
};

exports.findById = (noteId) => {
    const query = DbHelper.findById(Notes, noteId);
    LOGGER.info(query);
    return query;
};

exports.delete = (noteId) => {
    const query = DbHelper.delete(noteId);
    LOGGER.info(query);
    return query;
};

exports.save = (noteData) => {
    const query = DbHelper.save(Notes, noteData);
    LOGGER.info(query);
    return query;
};

exports.update = (noteData, noteId) => {
    const query = DbHelper.save(Notes, noteData, noteId);
    LOGGER.info(query);
    return query;
};
