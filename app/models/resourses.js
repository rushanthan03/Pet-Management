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
    // associations can be defined here
  };
  return resourses;
};
