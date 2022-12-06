const path = require("path");
const fs = require("fs");
const koneksi = require("../config/database");
const moment = require('moment')

let galery = {
galerySD: async (req, res) => {
    let qry = `SELECT * FROM galery WHERE kategori = 'sd'`
    try {
        await koneksi.query(qry, (err, results, fields)=>{
            if (err) throw err;
            res.send(results);
        })
    } catch (err) {
        res.send(err);
        console.log(err);
    }
},
galeryTK: async (req, res) => {
    let qry = `SELECT * FROM galery WHERE kategori = 'tk'`
    try {
        await koneksi.query(qry, (err, results, fields)=>{
            if (err) throw err;
            res.send(results);
        })
    } catch (err) {
        res.send(err);
        console.log(err);
    }
},
  postData : async (req, res) =>{
    if (req.files === null ) {
      let respon = {
        msg: "image not found !"
      }
      res.status(400).send(respon)

    } 

    let judul = req.body.judul;
    let deskripsi = req.body.deskripsi;
    let kategori = req.body.kategori;
    let dateNow = moment().format("YYYY-MM-DD")
    let file = req.files.file;
    let fileSize = file.data.length;
    let ext = path.extname(file.name);
    let filename = file.md5 + ext;
    let url = `${req.protocol}://${req.get("host")}/images/${filename}`;
    let allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(422).json({msg: "invalid Image"})
    }

    // if (fileSize > 5000000) {
    //   return res.status(422).json({msg: " Size overload"})
    // }

    file.mv(`./public/images/${filename}`,async(err)=>{
      if (err) {
        return res.status(500).json({msg: err.message});
      }
      try {
        let qry = `INSERT INTO galery (judul, kategori, description, date, url, ) 
        VALUES ('${judul}', '${kategori}', '${deskripsi}', '${dateNow}','${url}')`;
        await koneksi.query(qry, (results, fields) =>{
          console.log(qry);
          console.log(fields);
          if (err) throw err;
          if ( fields.affectedRows > 0) {
           let response = {
             code: 200,
             message: 'success',
             detail:'data berhasil ditambahkan'
           };
           res.status(200).send(response);

          } else {
           let error = {
             code: 400,
             message: 'error',
             detail:'data tidak berhasil ditambahkan'
           };
           res.status(400).send(error);
           console.log(error);
          }
          

        })
      } catch (error) {
        console.log(error);
      }

    })
  },
  deleteArtikel : async (req, res) =>{
      try {
        let id = req.body.id
        // select dulu baru delete
        let qry = `DELETE FROM artikel WHERE idartikel = '${id}'`;
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
module.exports = galery;
