'use strict'

const Mysql = require('../../helpers/mysql');
const Users = require('../models/user');
const DbHelper = require('../../helpers/query-generator');
const Logger = require('../../helpers/logger');

const LOGGER = new Logger(__filename);

exports.getUserPasswordByUserEmail = (userEmail) => {
    const query = `SELECT ${Users.mappings.columns.userPasswordHash} FROM ${Users.mappings.table} WHERE ${Users.mappings.columns.userEmail} = ${Mysql.escape(userEmail)};`;
    LOGGER.info(query);
    return query;
};

exports.login = (userEmail) => {
    const query = `SELECT ${Users.mappings.columns.userId}, ${Users.mappings.columns.userName}, ${Users.mappings.columns.userPasswordHash} FROM ${Users.mappings.table} WHERE ${Users.mappings.columns.userEmail} = ${Mysql.escape(userEmail)};`;
    LOGGER.info(query);
    return query;
};

exports.reset = (userData) => {
    const query = `UPDATE ${Users.mappings.table} SET ${Users.mappings.columns.userPasswordHash}  = ${Mysql.escape(userData.userPasswordHash)} WHERE ${Users.mappings.columns.userEmail} = ${Mysql.escape(userData.userEmail)};`;
    LOGGER.info(query);
    return query;
};
exports.findAll = () => {
    const query = DbHelper.findAll(Users);
    LOGGER.info(query);
    return query;
};

exports.findById = (userId) => {
    const query = DbHelper.findById(Users, userId);
    LOGGER.info(query);
    return query;
};

exports.findByUserEmail = (userEmail) => {
    const query = `SELECT ${Users.mappings.columns.userId} FROM ${Users.mappings.table} WHERE ${Users.mappings.columns.userEmail} = ${Mysql.escape(userEmail)};`;
    LOGGER.info(query);
    return query;
};

exports.save = (userData) => {
    const query = DbHelper.save(Users, userData);
    LOGGER.info(query);
    return query;
};

exports.update = (userData, userId) => {
    const query = DbHelper.update(Users, userData, userId)
    LOGGER.info(query);
    return query;
};

exports.delete = (userId) => {
    const query = DbHelper.delete(userId);
    LOGGER.info(query);
    return query;
};
