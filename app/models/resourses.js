"use strict";
module.exports = (sequelize, DataTypes) => {
  const resourses = sequelize.define(
    "resourses",
    {
      tittle: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "resourses",
      timestamps: true,
      underscored: true,
      paranoid: true,

      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  resourses.associate = function (models) {
    resourses.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' })
    resourses.belongsTo(models.pets, { foreignKey: 'pets_id', as: 'pets' })

  };
  return resourses;
};
