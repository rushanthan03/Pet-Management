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
    posts.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' })
    posts.belongsTo(models.pets, { foreignKey: 'pets_id', as: 'pets' })
    posts.hasMany(models.comments, { foreignKey: 'comments_id', as: 'comments' })

  };
  return posts;
};
