const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();
const routes = require('./routes');
// const koneksi = require('./config/database');

const PORT = process.env.PORT || 5000;

const app = express()

// set body parser
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes)
app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`))