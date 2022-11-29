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
  addArtikel: async (req, res) => {
    try {
        let judul = req.body.judul;
        let isi =  req.body.isi;
        let kategori = req.body.kategori
        let img = req.files.img;


        let filesize = img.size;
        console.log('ss',filesize);


        let ext = path.extname(img.name);
        let filename = img.md5 + ext;
        const url = `${req.protocol}://${req.get("host")}/images/${filename}`;
        let allowedType = ['.png', '.jpg', '.jpeg'];
      
        if (!allowedType.includes(ext.toLowerCase())) {
            return res.status(422).json({msg: "invalid Image"})
          }
          if (filesize > 5000000) {
            return res.status(422).json({msg: " Size overload"})
          }
          if (img   == 0 ||img == null || filesize < 0) {
            console.log(img.length);
            let response = {
                code: 400,
                message: 'Error',
                error:'articleImage tidak terisi'
              };      
            res.status(400).send(response);
            // return response;
          }

          img.mv(`./public/images/${filename}`,async(err)=>{
            if(err){
           
                return res.status(500).json({msg: err.message});
              }
              try {

                let qry = `INSERT INTO artikel (judul, isi, tglCreate, img, status, kategori) 
                VALUES ('${judul}', '${isi}', NOW(), '${filename}', '1', '${kategori}')`;
            koneksi.query(qry, (err, results, fields) =>{
             if (err) throw err;
             if ( results.affectedRows > 0) {
              let response = {
                code: 200,
                message: 'success',
                detail:'data berhasil ditambahkan'
              };
              res.status(200).send(response);
              console.log(results);
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
              } catch(err){
                console.log(err);
                
                let response = {
                    code: 500,
                    message: 'error',
                    error:err
                  };
                  res.status(500).send(response)
              }
          })
      
       
    } catch (err) {
      let response = {
        code: 500,
        message: 'error',
        error:err
      };
      console.log(err);
      res.status(500).send(response)
        return;
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
    let isi = req.body.isi;
    let kategori = req.body.kategori;
    let dateNow = moment().format("YYYY-MM-DD")
    console.log('req',req);
    console.log('rf',req.files);
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
        let qry = `INSERT INTO artikel (judul, isi, tglCreate, img, url, status, kategori) 
        VALUES ('${judul}', '${isi}', '${dateNow}', '${filename}','${url}', '1', '${kategori}')`;
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
  }
};
module.exports = artikel;
