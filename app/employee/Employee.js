const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
   
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,

  },
  registration: { 
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthday:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 

  },
  password:{
    type: DataTypes.STRING,
    allowNull: false,

  }

}, {
  timestamps: false, 
});

module.exports = Employee;
