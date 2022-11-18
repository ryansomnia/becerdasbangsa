const express = require('express');
const router = express.Router()
const register = require('./controller/register')
const user = require('./controller/user')
const artikel = require('./controller/artikel')


const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null, "./aset");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

const upload = multer({ storage : storage })

// AS USER
router.get('/register/getAll',register.getData)
router.post('/register/registerData',register.registerData)

// AS ADMIN
router.post('/user/login',user.login)
router.post('/user/addUser',user.addUser)

// Artikel Service

router.post('/artikel/addArtikel',artikel.addArtikel)

module.exports = router;