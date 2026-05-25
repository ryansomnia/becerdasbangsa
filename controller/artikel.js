const path = require("path");
const fs = require("fs");
const koneksi = require("../config/database");
const moment = require('moment')

let artikel = {
  getAll: async (req, res) =>{
try {
  let qry = `SELECT * FROM artikel`;
  koneksi.query(qry, (err, results, fields) => {
    if (err) throw err;
    res.send(results);
    // console.log(results);
  });
} catch (err) {
  res.send(err);
      console.log(err);
}
  },
  getCarousel: async (req, res) =>{
    try {
      let qry = `SELECT * FROM artikel WHERE kategori = 'carousel' ORDER BY tglCreate DESC `;
      koneksi.query(qry, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
        // console.log(results);
      });
    } catch (err) {
      res.send(err);
          console.log(err);
    }
  },
  getNews: async (req, res) =>{
    try {
      let qry = `SELECT * FROM artikel WHERE kategori = 'news' ORDER BY tglCreate DESC`;
      koneksi.query(qry, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
      });
    } catch (err) {
      res.send(err);
          console.log(err);
    }
  },
  getArtikel: async (req, res) =>{
    try {
      let qry = `SELECT * FROM artikel WHERE kategori = 'artikel' ORDER BY tglCreate DESC `;
      koneksi.query(qry, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
      });
    } catch (err) {
      res.send(err);
          console.log(err);
    }
  },
  getOneNews: async (req, res) =>{
    let id = req.body.id
    try {
      let qry = `SELECT * FROM artikel WHERE kategori = 'news' AND idartikel = '${id}' `;
      koneksi.query(qry, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
      });
    } catch (err) {
      res.send(err);
          console.log(err);
    }
  },
  getOneArtikel: async (req, res) =>{
    let id = req.body.id
    try {
      let qry = `SELECT * FROM artikel WHERE idartikel = '${id}' `;
      koneksi.query(qry, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
      });
    } catch (err) {
      res.send(err);
          console.log(err);
    }
  },
  
  
  postData: async (req, res) => {

    try {
  
      if (!req.files || req.files === null) {
  
        return res.status(400).json({
          code: 400,
          status: 'error',
          message: 'image kosong !'
        });
  
      }
  
      let judul = req.body.judul;
      let isi = req.body.isi;
      let kategori = req.body.kategori;
  
      if (!judul || !isi || !kategori) {
  
        return res.status(400).json({
          code: 400,
          status: 'error',
          message: 'input data tidak terisi !'
        });
  
      }
  
      let dateNow = moment().format("YYYY-MM-DD");
  
      let file = req.files.file;
  
      let ext = path.extname(file.name);
  
      let filename = file.md5 + ext;
  
      // FIX URL
      let url = `https://api.sekolahcerdasbangsa.sch.id/images/${filename}`;
  
      let allowedType = ['.png', '.jpg', '.jpeg'];
  
      if (!allowedType.includes(ext.toLowerCase())) {
  
        return res.status(422).json({
          message: "invalid image"
        });
  
      }
  
      // upload image
      file.mv(`./public/images/${filename}`, async (err) => {
  
        if (err) {
  
          console.log(err);
  
          return res.status(500).json({
            message: err.message
          });
  
        }
  
        // query insert
        let qry = `
          INSERT INTO artikel 
          (judul, isi, tglCreate, img, url, status, kategori) 
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
  
        koneksi.query(
          qry,
          [
            judul,
            isi,
            dateNow,
            filename,
            url,
            1,
            kategori
          ],
          (error, results, fields) => {
  
            if (error) {
  
              console.log(error);
  
              return res.status(500).json({
                code: 500,
                status: 'error',
                message: 'database error'
              });
  
            }
  
            if (results.affectedRows > 0) {
  
              return res.status(200).json({
                code: 200,
                status: 'success',
                message: 'data berhasil ditambahkan'
              });
  
            } else {
  
              return res.status(400).json({
                code: 400,
                status: 'error',
                message: 'data gagal ditambahkan'
              });
  
            }
  
          }
        );
  
      });
  
    } catch (error) {
  
      console.log(error);
  
      return res.status(500).json({
        code: 500,
        status: 'error',
        message: 'server error'
      });
  
    }
  
  },
  updateData: async (req, res) => {
    let {id, judul, isi, kategori } = req.body;
   console.log('req', req.body);
    try {
      let qrySelect = `SELECT * FROM artikel WHERE idartikel = '${id}'`;

      koneksi.query(qrySelect, (err, results, fields) => {
        if (err) throw err;
          let result = {
            code : 200,
            status : "success",
            data : results
          }
          if (result.data.length > 0) {
            let filename = `./public/images/${result.data[0].img}`;
             console.log('filename',filename);
               fs.unlinkSync(filename)
               let file = req.files.file;
               console.log('file', file);
               let ext = path.extname(file.name);
               let fileData = file.md5 + ext;
               let url = `${req.protocol}://${req.get("host")}/images/${fileData}`;
               let allowedType = ['.png', '.jpg', '.jpeg'];
           
               if (!allowedType.includes(ext.toLowerCase())) {
                 let respon = {
                   code : 422,
                   status : 'error',
                   message : 'harus tipe gambar'
                 }
                 return res.status(respon.code).send(respon)
               }
              let qry = `UPDATE artikel 
                        SET judul = '${judul}', isi = '${isi}',
                        kategori = '${kategori}', url = '${url}, img = '${fileData}''
                         WHERE idartikel= '${id}'`;
              
              koneksi.query(qry, (err, results, fields) => {
                if (err) throw err;
                let result = {
                  code : 200,
                  status : "success",
                  data : "data berhasil dihapus"
                }
               
                res.status(result.code).send(result);
                console.log(result);
              }
              )
            }
     
      })
    } catch (err) {
      res.send(err);
    }
  },
  deleteArtikel : async (req, res) =>{
      try {
        let id = req.body.id
        let qry = `SELECT * FROM artikel WHERE idartikel = '${id}'`;
        koneksi.query(qry, (err, results, fields) => {
          if (err) throw err;
          let result = {
            code : 200,
            status : "success",
            data : results
          }
          console.log('x',result);
          if (result.data.length >0) {
          let filename = `./public/images/${result.data[0].img}`;
            console.log(filename);
             fs.unlinkSync(filename)
            let qry = `DELETE FROM artikel WHERE idartikel = '${id}'`;
            koneksi.query(qry, (err, results, fields) => {
              if (err) throw err;
              let result = {
                code : 200,
                status : "success",
                message : "data berhasil dihapus"
              }
             
              res.status(result.code).send(result);
              console.log(result);
            }
            )
          }
            }
     
        )}
      
      catch (err) {
        let error = {
          code : 500,
          status : "error",
          error : err
  
      }
      res.status(error.code).send(error);
      console.log(error);
      }
    },
    searchByJudul : async(req, res) =>{
      let judul = req.body.judul
    try {
      let qry = `SELECT * FROM artikel WHERE judul LIKE '%${judul}%'`;
      koneksi.query(qry, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
      });
    } catch (e) {
      res.send(e);
    }
    }
  
};
module.exports = artikel;
