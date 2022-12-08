const express = require('express');
const router = express.Router()
const register = require('./controller/register')
const user = require('./controller/user')
const artikel = require('./controller/artikel')
const cors = require('cors')

router.use(cors());

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
router.post('/register/deleteData',register.deleteData)


// AS ADMIN
router.get('/user/getAll',user.getData)
router.post('/user/login',user.login)
router.post('/user/addUser',user.addUser)
router.post('/user/deleteUser',user.deleteData)


// Artikel Service
router.get('/artikel/getAll',artikel.getAll)
router.get('/artikel/getCarousel',artikel.getCarousel)
router.get('/artikel/getNews',artikel.getNews)
router.post('/artikel/getOneNews',artikel.getOneNews)
router.post('/artikel/addArtikel',artikel.postData)
router.post('/artikel/deleteArtikel',artikel.deleteArtikel)

module.exports = router;