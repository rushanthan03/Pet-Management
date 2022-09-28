'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'role',
    timestamps: true,
    underscored: true,
    paranoid: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at',
  })
  Role.associate = function (models) {
    // associations can be defined here
    Role.belongsToMany(models.User, {foreignKey: 'role_id', through: 'user_roles', as: 'users' });
    Role.belongsToMany(models.Policy, { foreignKey: 'role_id',  through: 'role_policies', as: 'policies'  });

  };
  return Role;
};