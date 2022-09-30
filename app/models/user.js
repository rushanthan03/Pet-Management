"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      email_verified_at: DataTypes.DATE,
      password: DataTypes.STRING,

      is_active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
      underscored: true,
      paranoid: true,

      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  User.associate = function (models) {
    User.hasMany(models.pets, { foreignKey: "user_id", as: "pets" });
    User.hasMany(models.posts, { foreignKey: "user_id", as: "posts" });
    User.hasMany(models.comments, { foreignKey: "user_id", as: "comments" });
    User.hasMany(models.resourses, { foreignKey: "user_id", as: "resourses" });
    User.belongsToMany(models.Role, {
      foreignKey: "user_id",
      through: "user_roles",
      as: "roles",
    });

  };

  return User;
};
