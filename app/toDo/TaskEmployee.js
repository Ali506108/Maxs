const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Employee = require('../employee/Employee');

const TaskEmployee = sequelize.define('TaskEmployee', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
 
}, {
  timestamps: true, // Добавляет createdAt и updatedAt
});

Employee.hasMany(TaskEmployee, { foreignKey: 'employeeId' , as: 'tasks' });
TaskEmployee.belongsTo(Employee, { foreignKey: 'employeeId', as:'author' });

module.exports = TaskEmployee;
