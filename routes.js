const express = require('express');
const artikel = require('./controller/artikel')
const ppdb = require('./controller/ppdb')
const router = express.Router();


// login
// register


// artikel
router.get('/api/cerdasbangsa/getAllData', artikel.getAllData)
router.post('/api/cerdasbangsa/insertCarousel', artikel.insertCarousel)

// get data news
// get data artikel
// get data event
// regisppdb
router.get('/api/cerdasbangsa/getAllData', ppdb.getAllData)
router.post('/api/cerdasbangsa/registerData', ppdb.registerData)
router.post('/api/cerdasbangsa/editData', ppdb.editData)
router.post('/api/cerdasbangsa/deleteData', ppdb.deleteData)


module.exports = router;