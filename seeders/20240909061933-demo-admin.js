const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const hashedPassword = await bcrypt.hash('roorAdmin037', 10);

    await queryInterface.bulkInsert('Admins', [{
      email: 'admin@example.com',
      password: hashedPassword,

    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Admins', null, {});
  }
};
