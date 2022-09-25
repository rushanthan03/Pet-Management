'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tittle: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      post_type: {
        type: Sequelize.ENUM("Active", "Deactive"),
        defaultValue: "Active",
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      pets_id: {
        type: Sequelize.INTEGER,
        references: { model: 'pets', key: 'id' },
        onDelete: 'CASCADE',
      },
      // comments_id: {
      //   type: Sequelize.INTEGER,
      //   references: { model: 'comments', key: 'id' },
      //   onDelete: 'CASCADE',
      // },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};