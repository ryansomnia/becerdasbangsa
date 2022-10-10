const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const router = require('./routes')
const koneksi = require('./config/database');
const appError = require('./utils/appError');
const errorHandle = require('./utils/errorHandle');
let dotenv = require('dotenv');
let env = dotenv.config();

const app = express();
const PORT = process.env.PORT || 3013;


app.use("/", router);
app.use(function (req, res, next) {
    
    let ress = {
        code: '404',
        message: "Failed, URL tidak ditemukan",
    }
    res.status(404).send(ress);
console.log(ress);
  });
  

// set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// app.all("*",(req,res,next)=>{
//     next(new appError(`The Url ${req.originalUrl} does not exist`,404));
// });

// app.use(errorHandle);

// buat server nya
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));

module.exports = app;