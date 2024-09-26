const {logIn , logInEmployee} =  require('./controllers')
const express = require('express')
const router = express.Router()

router.post('/api/login/admin' , logIn)

router.post('/api/login/employee' , logInEmployee)


module.exports = router  