'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clients', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,

      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,

      },
      birthday: {
        type: Sequelize.STRING,
        allowNull: true,

      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true,

      },
      
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Clients');
  }
};
