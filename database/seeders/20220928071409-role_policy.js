'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let policies = await queryInterface.sequelize.query(
      `SELECT id from policies;`
    );

    let values = [];
    policies[0].map(item => {
        values.push({
          role_id: 1,
          policy_id: item.id,
          created_at: new Date(),
          updated_at: new Date()
        })
    })
    
    await queryInterface.bulkInsert('role_policies', values)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('role_policies', null, {});
  }
};
