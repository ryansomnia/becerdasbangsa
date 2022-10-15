const conn = require('../config/database')

let ppdb = {
    getAllData : async(req, res)=>{
        try {
            conn.query(`SELECT * FROM siswa WHERE status = 'inRegister'`, (err,data, fields)=>{
                if (err) {
                    let respon = {
                        code : 400,
                        status : 'error',
                        error : err       
                    }
                   res.status(400).send(respon) 
                   console.log(respon);
                } else {
                    let respon = {
                        code : 200,
                        status : 'success',
                        data : data       
                    }
                   res.status(200).send(respon) 
                   console.log(respon);
                }
            })
        } catch (error) {
            let respon = {
                code : 500,
                status : 'error',
                error : error       
            }
           res.status(500).send(respon) 
           console.log(respon);
        }
    },
    registerData : async(req, res)=>{
        try {
            let namaSiswa = req.body.namaSiswa
            let jenisKelamin = req.body.jenisKelamin
            let status = req.body.status

            let qry = `INSERT INTO siswa (namaSiswa, jenisKelamin, status) 
            VALUES ('${namaSiswa}', '${jenisKelamin}', '${status}')`

            conn.query(qry, (err,data, fields)=>{
                if (err) {
                    let respon = {
                        code : 400,
                        status : 'error',
                        error : err       
                    }
                   res.status(400).send(respon) 
                   console.log(respon);
                } else {
                    let respon = {
                        code : 200,
                        status : 'success',
                        data : data       
                    }
                   res.status(200).send(respon) 
                   console.log(respon);
                }
            })
        } catch (error) {
            let respon = {
                code : 500,
                status : 'error',
                error : error       
            }
           res.status(500).send(respon) 
           console.log(respon);
        }
    },
    editData : async(req, res)=>{
        try {
            let id = req.body.id
            let status = req.body.status

            let qry = `UPDATE siswa 
            SET status = '${status}' 
            WHERE idsiswa = '${id}'`

            conn.query(qry, (err,data, fields)=>{
                if (err) {
                    let respon = {
                        code : 400,
                        status : 'error',
                        error : err       
                    }
                   res.status(400).send(respon) 
                   console.log(respon);
                } else {
                    let respon = {
                        code : 200,
                        status : 'success',
                        data : data       
                    }
                   res.status(200).send(respon) 
                   console.log(respon);
                }
            })
        } catch (error) {
            let respon = {
                code : 500,
                status : 'error',
                error : error       
            }
           res.status(500).send(respon) 
           console.log(respon);
        }
    },
    deleteData : async(req, res)=>{
        try {
            let id = req.body.id

            let qry =`DELETE FROM siswa 
            WHERE idsiswa = '${id}'`

            conn.query(qry, (err,data, fields)=>{
                if (err) {
                    let respon = {
                        code : 400,
                        status : 'error',
                        error : err       
                    }
                   res.status(400).send(respon) 
                   console.log(respon);
                } else {
                    let respon = {
                        code : 200,
                        status : 'success',
                        data : data       
                    }
                   res.status(200).send(respon) 
                   console.log(respon);
                }
            })
        } catch (error) {
            let respon = {
                code : 500,
                status : 'error',
                error : error       
            }
           res.status(500).send(respon) 
           console.log(respon);
        }
    },

}

module.exports = ppdb;