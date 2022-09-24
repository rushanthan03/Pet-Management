"use strict";
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define(
    "posts",
    {
      tittle: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      post_type: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "posts",
      timestamps: true,
      underscored: true,
      paranoid: true,

      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  posts.associate = function (models) {
    // associations can be defined here
  };
  return posts;
};
