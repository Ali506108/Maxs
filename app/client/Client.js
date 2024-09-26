const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,

  },
  birthday:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender:{
    type: DataTypes.STRING,
    allowNull: true,
  }

}, {
  timestamps: false, 
});

module.exports = Client;
