'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TaskEmployees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      employeeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Employees', // Название таблицы Employees
          key: 'id',
        },
        onUpdate: 'CASCADE', // При обновлении employeeId, обновляются связанные записи
        onDelete: 'CASCADE', // При удалении сотрудника поле employeeId становится null
        allowNull: true, // Поле может быть пустым
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TaskEmployees');
  }
};
