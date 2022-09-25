"use strict";
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define(
    "categories",
    {
      categroy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "categories",
      timestamps: true,
      underscored: true,
      paranoid: true,

      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  categories.associate = function (models) {
    categories.hasMany(models.pets, { foreignKey: 'categories_id', as: 'pets'})
  };
  return categories;
};
