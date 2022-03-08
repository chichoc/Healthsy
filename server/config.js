require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DATABASE_PASSWORD,
  database: 'login',
});

db.connect();

module.exports = db;
