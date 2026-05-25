const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');
const FileUpload = require('express-fileupload');

const PORT = process.env.PORT || 5000;

const app = express();


// CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://sekolahcerdasbangsa.sch.id'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));


// STATIC
app.use(express.static('public'));


// FILE UPLOAD
app.use(FileUpload({
  limits: {
    fileSize: 20 * 1024 * 1024
  },
  abortOnLimit: true
}));


// BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// ROUTES
app.use('/', routes);


// RUN SERVER
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});