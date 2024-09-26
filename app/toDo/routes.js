const {createTaskEmployee ,   getAllTasks , updateTaskEmployee  ,deleteEmployeeTask } =  require('./controllers')
const express = require('express')
const router = express.Router()
const passport = require('passport');
const {adminMiddleware , employeeMiddleware}  = require('./middlewares')

router.post('/task' , passport.authenticate('jwt', { session: false }) ,  createTaskEmployee)
router.get('/task' , passport.authenticate('jwt', { session: false }) ,  getAllTasks)
router.put('/task/:id' , passport.authenticate('jwt', { session: false }) ,  updateTaskEmployee)
router.delete('/task/:id' , passport.authenticate('jwt', { session: false }) ,  deleteEmployeeTask)





module.exports = router  