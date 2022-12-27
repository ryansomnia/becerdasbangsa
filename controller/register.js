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
  getOneData : async (req, res) => {
    let idregister = req.body.idregister
    try {
      let qry = `SELECT * FROM register WHERE idregister = '${idregister}'`;
      koneksi.query(qry, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
      });
    } catch (e) {
      res.send(e);
    }
  },
  registerData: async (req, res) => {
    try {
      let {
        namaLengkap,
        jenisRegis,
        jenisKelamin,
        tanggalLahir,
        tempatLahir,
        agama,
        alamat,
        noHandphone,
        asalSekolah
        } = req.body;

        if (namaLengkap === "" ||jenisRegis === "" || jenisKelamin === "" 
        || tanggalLahir === "" || tempatLahir === "" || 
        agama === "" || alamat ==="" || noHandphone === ""
        || asalSekolah === "") {
          let err = {
            code : 400,
            status : 'error',
            message : 'input data tidak terisi !'
          }
          res.status(err.code).send(err)
        }

        // validasi angka 
  
          let isphone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(noHandphone);
          if(!isphone) {
              
              let err = {
                code : 400,
                status : 'error',
                message : 'input nomor handphone tidak sesuai !'
              }
              res.status(err.code).send(err)
          }
        
      let qry = `INSERT INTO register (namaLengkap, jenisRegis, jenisKelamin, tanggalLahir, tempatLahir, 
        agama, alamat, noHandphone, asalSekolah, statusRegistrasi) 

      VALUES ('${namaLengkap}', '${jenisRegis}', '${jenisKelamin}', '${tanggalLahir}', '${tempatLahir}',
       '${agama}', '${alamat}', '${noHandphone}', '${asalSekolah}', 'registrasi');`;

      koneksi.query(qry, (err, fields) => {
        if (err) throw err;
        let respon = {
          code : 201,
          status : 'success',
          message : 'data berhasil di registrasi'
        }
        res.send(respon);
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
  },
  updateData: async (req, res) => {
    let {
      idregister,
      namaLengkap,
      jenisRegis,
      jenisKelamin,
      tanggalLahir,
      tempatLahir,
      agama,
      alamat,
      noHandphone,
      asalSekolah
      } = req.body;
    try {
      let qry = `UPDATE register 
                SET namaLengkap = '${namaLengkap}', jenisRegis = '${jenisRegis}', jenisKelamin = '${jenisKelamin}',
                 tanggalLahir = '${tanggalLahir}', tempatLahir = '${tempatLahir}', agama = '${agama}', 
                 alamat = '${alamat}', noHandphone = '${noHandphone}', asalSekolah = '${asalSekolah}'
                WHERE idregister = '${idregister}'`;
      koneksi.query(qry, (err, results) => {
        if (err) throw err;
        console.log(results);
        let respon = {
          code : 200,
          status : 'success',
          message : 'data berhasil diubah'
        }
        res.send(respon);
      });
    } catch (err) {
      res.send(err);
    }
  },
  searchByNama: async (req, res) =>{
    let namaLengkap = req.body.namaLengkap
    try {
      let qry = `SELECT * FROM register WHERE namaLengkap LIKE '%${namaLengkap}%'`;
      koneksi.query(qry, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
      });
    } catch (e) {
      res.send(e);
    }
  }
};

module.exports = register;
