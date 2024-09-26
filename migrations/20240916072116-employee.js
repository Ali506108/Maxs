'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Employees', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
       
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      registration: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      birthday: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
  
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Employees');
  }
};
