const path = require("path");
const fs = require("fs");
const koneksi = require("../config/database");
const moment = require('moment')

let validation = {
  empty: async (input) =>{
    if (input === "") {
         err = {
            code : 400,
            status : "error",
            error : "data input tidak terisi"
          }
         console.log(err);
         return res.status(err.code).send(err);
         
    } else {
        next()
    }

  }
  
};
module.exports = validation;
