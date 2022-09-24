"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.ENUM("Male", "Female"),
        defaultValue: "Male",
      },
      age: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
      },
      weight: {
        type: Sequelize.DECIMAL(10, 2),
      },
      cat_code: {
        type: Sequelize.STRING,
      },
      is_vaccinated: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      description: {
        type: Sequelize.STRING,
      },
      additional_info: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("Active", "Deactive"),
        defaultValue: "Active",
      },
      transfer_status: {
        type: Sequelize.ENUM("True", "False"),
        defaultValue: "True",
      },
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
    await queryInterface.dropTable("pets");
  },
};
