'use strict';
module.exports = (sequelize, DataTypes) => {
  const pets = sequelize.define('pets', {
    name: DataTypes.STRING,
    gender: DataTypes.ENUM("Male", "Female"),
    age: DataTypes.INTEGER,
    image: DataTypes.STRING,
    weight:DataTypes.DECIMAL(10, 2),
    cat_code: DataTypes.STRING,
    is_vaccinated: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    additional_info: DataTypes.STRING,
    status: DataTypes.ENUM("Active", "Deactive"),
    transfer_status: DataTypes.ENUM("True", "False"),
    
  }, {
    sequelize,
    modelName: 'pets',
    timestamps: true,
    underscored: true,
    paranoid: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  })
  pets.associate = function (models) {
    pets.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' })
    pets.belongsTo(models.categories, { foreignKey: 'categories_id', as: 'categories' })

  };
  return pets;
};