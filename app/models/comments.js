"use strict";
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define(
    "comments",
    {
      categroy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "comments",
      timestamps: true,
      underscored: true,
      paranoid: true,

      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  comments.associate = function (models) {
    // associations can be defined here
  };
  return comments;
};
