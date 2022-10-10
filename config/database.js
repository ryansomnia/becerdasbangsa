const mysql = require('mysql2');
let dotenv = require('dotenv');
let env = dotenv.config();
// buat konfigurasi koneksi
const conn = mysql.createConnection({
    host: process.env.local_HOST,
    user: process.env.local_USERNAME,
    password: process.env.local_PASSWORD,
    database: process.env.local_DATABASE
});

conn.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});
module.exports = conn;