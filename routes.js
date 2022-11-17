const express = require('express');
const router = express.Router()
const register = require('./controller/register')
const user = require('./controller/user')

// AS USER
router.get('/register/getAll',register.getData)
router.post('/register/registerData',register.registerData)

// AS ADMIN
router.post('/user/login',user.login)
router.post('/user/addUser',user.addUser)

module.exports = router;