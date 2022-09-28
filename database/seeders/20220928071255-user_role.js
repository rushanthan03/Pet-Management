'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_roles', [
      {
        user_id : 1,
        role_id : 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id : 2,
        role_id : 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_roles', null, {});
  }
};
