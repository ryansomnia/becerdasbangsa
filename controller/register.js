const koneksi = require("../config/database");

let register = {
  getData: async (req, res) => {
    try {
      let qry = `SELECT * FROM register`;
      koneksi.query(qry, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
        console.log(results);
      });
    } catch (e) {
      res.send(e);
      console.log(e);
    }
  },
  registerData: async (req, res) => {
    try {
      let {
        namaLengkap,
        jenisKelamin,
        tanggalLahir,
        tempatLahir,
        agama,
        alamat,
        noHandphone,
        asalSekolah
        } = req.body;

        // validasi angka 
        // validasi empty

        
      let qry = `INSERT INTO register (namaLengkap, jenisKelamin, tanggalLahir, tempatLahir, 
        agama, alamat, noHandphone, asalSekolah) 

      VALUES ('${namaLengkap}', '${jenisKelamin}', '${tanggalLahir}', '${tempatLahir}',
       '${agama}', '${alamat}', '${noHandphone}', '${asalSekolah}');`;

      koneksi.query(qry, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
        console.log(results);
      });
    } catch (e) {
      res.send(e);
      console.log(e);
    }
  },
  deleteData:async (req, res) =>{
    try {
      let idregister = req.body.idregister
      console.log('idregister',idregister);
      let qry = `DELETE FROM register WHERE idregister = '${idregister}'`;
      koneksi.query(qry, (err, results, fields) => {
        if (err) throw err;
        let result = {
          code : 200,
          status : "success",
          data : "data berhasil dihapus"

      }
      res.status(result.code).send(result);
      console.log(result);
      });
    } catch (err) {
      let error = {
        code : 500,
        status : "error",
        error : err

    }
    res.status(error.code).send(error);
    console.log(error);
    }
  }
};

module.exports = register;
