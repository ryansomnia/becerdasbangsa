const path = require("path");
const fs = require("fs");
const koneksi = require("../config/database");

let artikel = {
  addArtikel: async (req, res) => {
    try {
        let judul = req.body.judul;
        let isi =  req.body.isi;
        let tglCreate = req.body.tglCreate
        let kategori = req.body.kategori

        let img = req.files.img;
        console.log(img);
        let filesize = img.size;
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
          if (img   == 0 ||  img   == null) {
            let response = {
                code: 400,
                message: 'Error',
                error:'articleImage   tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }

          img.mv(`./public/images/${filename}`,async(err)=>{
            if(err){
                return res.status(500).json({msg: err.message});
              }
              try {

                let qry = `INSERT INTO artikel (judul, isi, tglCreate, img, status, kategori) 
                VALUES ('${judul}', '${isi}', '${tglCreate}', '${filename}', '1', '${kategori}')`;
            koneksi.query(qry, (err, results, fields) =>{
             if (err) throw err;
             res.send(results);
             console.log(results);
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
        res.send(err);
        console.log(err);
    }
    
    },
};
module.exports = artikel;
