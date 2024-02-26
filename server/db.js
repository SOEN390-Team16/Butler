const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    ssl: { rejectUnauthorized: false},
});

console.log('Database connected successfully.');

module.exports = pool;

