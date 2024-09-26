const {createEmployee , getAllEmployee , updateEmployee , deleteEmployee  , getEmployeeById} =  require('./controllers')
const express = require('express')
const router = express.Router()
const passport = require('passport');
const adminMiddleware = require('./middlewares')

router.post('/employee' , passport.authenticate('jwt', { session: false }), adminMiddleware ,  createEmployee)
router.get('/employee' , passport.authenticate('jwt', { session: false }), adminMiddleware ,  getAllEmployee)
router.put('/employee/:id' , passport.authenticate('jwt', { session: false }), adminMiddleware ,  updateEmployee)
router.delete('/employee/:id' , passport.authenticate('jwt', { session: false }), adminMiddleware ,  deleteEmployee)
router.get('/employee/:id' , passport.authenticate('jwt', { session: false }), adminMiddleware ,  getEmployeeById)


module.exports = router  