'use strict'

require('dotenv').config();
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log("Connected to DB!");
});

function escape(value) {
    return mysql.escape(value);
}

module.exports = {
    connect: connection,
    escape: escape
};