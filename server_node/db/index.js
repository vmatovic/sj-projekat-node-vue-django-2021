const mysql = require('mysql');

const connection = mysql.createConnection({
    password: '',
    user: 'root',
    database: 'csd_radnja',
    host: 'localhost'
});

connection.connect();
module.exports = connection;