const appError = require('../utils/appError');
const conn = require('../config/database')

let artikel = {
    getAllData : async(req, res)=>{
        try {
            conn.query(`SELECT * FROM artikel`, (err,data, fields)=>{
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
    }
}

module.exports = artikel;