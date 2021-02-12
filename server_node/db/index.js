const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    password: '',
    user: 'root',
    database: 'csd_radnja',
    host: 'localhost'
});

module.exports = mysql;