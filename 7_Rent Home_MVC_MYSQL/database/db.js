const mysql = require('mysql2');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Root@123',
    database: 'db'
});

module.exports = db.promise();