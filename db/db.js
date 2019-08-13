require('dotenv').config();
const mysql = require('mysql');


const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    timezone: 'UTC',
});

con.connect(function(err) {
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
    db: con,
    escape: escape
};