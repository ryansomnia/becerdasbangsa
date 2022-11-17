const mysql = require('mysql');
require('dotenv').config();
// buat konfigurasi koneksi
const koneksi = mysql.createConnection({
    host: process.env.local_HOST,
    user: process.env.local_USERNAME,
    password: process.env.local_PASSWORD,
    database: process.env.local_DATABASE
});
// koneksi database
koneksi.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});
module.exports = koneksi;