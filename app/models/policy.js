'use strict';
module.exports = (sequelize, DataTypes) => {
  const Policy = sequelize.define('Policy', {
    name: DataTypes.STRING,
    group: DataTypes.STRING,
    description: DataTypes.STRING,
    model: DataTypes.STRING,
    action: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'policy',
    timestamps: true,
    underscored: true,
    paranoid: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at',
  })
  Policy.associate = function (models) {
    // associations can be defined here
    Policy.belongsToMany(models.Role, { foreignKey: 'policy_id', through: 'role_policies', as: 'roles' });
  };
  return Policy;
};