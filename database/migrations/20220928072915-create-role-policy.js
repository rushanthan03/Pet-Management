'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('role_policies', {
      role_id: {
        type: Sequelize.INTEGER,
        references: { model: 'roles', key: 'id' },
        onDelete: 'CASCADE',
      },
      policy_id: {
        type: Sequelize.INTEGER,
        references: { model: 'policies', key: 'id' },
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('role_policies');
  }
};