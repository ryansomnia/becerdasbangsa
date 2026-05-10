const mysql = require('mysql');
require('dotenv').config();
// buat konfigurasi koneksi
const koneksi = mysql.createConnection({
    host: process.env.vpn_HOST,
    user: process.env.vpn_USERNAME,
    password: process.env.vpn_PASSWORD,
    database: process.env.vpn_DATABASE
});
// koneksi database
koneksi.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});
module.exports = koneksi;