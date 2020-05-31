'use strict'

require('dotenv').config();
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    database: process.env.RDS_DB_NAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT
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
    db: connection,
    escape: escape
};