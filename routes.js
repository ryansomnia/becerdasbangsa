const express = require('express');
const artikel = require('./controller/artikel')
const router = express.Router();

router.get('/api/cbn/getAllData', artikel.getAllData)

module.exports = router;