"use strict";
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define(
    "comments",
    {
      comment: DataTypes.STRING,
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
    comments.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' })
    comments.belongsTo(models.posts, { foreignKey: 'posts_id', as: 'posts' })

  };
  return comments;
};
