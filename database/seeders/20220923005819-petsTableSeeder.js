'use strict';

const { NONE } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'pets',
      [
        {
          name: 'admin',
          age: 5,
          image:"cat",
          weight:30.00,
          cat_code:"cat001",
          description:"cat",
          additional_info:"good cat",
          user_id : 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('pets', null, {});
  },
};
