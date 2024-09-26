const Admin = require('./Admin')
const Employee = require('../employee/Employee')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { jwtOptions } = require('./passport')
const { where } = require('sequelize')


const logIn = async(req , res)=>{
    if(!req.body.email ||  req.body.email.length === 0 || 
        !req.body.password ||req.body.password.length === 0
     ){
        res.status(401).send({message : 'Bad Credentials'})
     }else{
        const admin = await Admin.findOne({
            where:{
                email : req.body.email
            }
        })
        if(!admin) return res.status(401).send({message : 'Admin with that email no exist'})
        
        const isMatch = await bcrypt.compare(req.body.password , admin.password)
        if(isMatch){

            const token = jwt.sign({
                id : admin.id,
                email : admin.email, 
                role :'admin'
             
            } , jwtOptions.secretOrKey, {
                expiresIn : 24 * 60 * 60 * 365
            })
            res.status(200).send({token})
         
        }else{
            res.status(401).send({message : 'Password is incorrect'})
        }
     }
} 
const checkPassword = async (password, hashedPassword) => {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
      return match; // true, если пароли совпадают, иначе false
    } catch (error) {
      throw new Error('Error while comparing passwords');
    }
  };
  

const logInEmployee = async(req , res)=>{
    const {email , password}  = req.body
    const employee = await Employee.findOne({where:{email}})
    if(!employee){
        return res.status(401).send({message : 'Employee with email not exist'})
    }
    const isPasswordCorrect = await checkPassword(password, employee.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    const token = jwt.sign({
        id : employee.id,
        email : employee.email, 
        role :'employee'
     
    } , jwtOptions.secretOrKey, {
        expiresIn : 24 * 60 * 60 * 365
    })
    res.status(200).send({token})
 

}
module.exports = {
    logIn ,
    logInEmployee
}