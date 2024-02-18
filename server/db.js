const Pool = require('pg').Pool;

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
})

module.exports = pool;