const express = require('express');
const artikel = require('./controller/artikel')
const router = express.Router();


// login
// register
router.get('/api/cbn/getAllData', artikel.getAllData)
// get data news
// get data artikel
// get data event
// regisppdb

module.exports = router;