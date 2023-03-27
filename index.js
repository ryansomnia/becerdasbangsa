const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();
const routes = require('./routes');
const FileUpload = require('express-fileupload')

const PORT = process.env.PORT || 5000;

const app = express()
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// set body parser
app.options('*', cors());
app.use(express.static('public'));
app.use(FileUpload());
// Configuring body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes)
app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`))