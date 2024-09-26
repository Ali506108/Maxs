const express = require('express')
// const passport = require('passport')
const cors = require('cors')
const multer = require('multer');

const app = express()
const upload = multer();
app.use(upload.any());
// app.use(passport.initialize());
// app.use(logger('dev'))
app.use(express.urlencoded())
app.use(express.json())
app.use(cors())



// require('./app/auth/passport')

app.use(require('./app/login/routes'))
app.use(require('./app/client/routes'))
app.use(require('./app/employee/routes'))
app.use(require('./app/toDo/routes'))
require('./app/sendMessage/cronTasks');

app.listen(3000 , ()=>{
    console.log('Server is  listening  on port 3000');
})

