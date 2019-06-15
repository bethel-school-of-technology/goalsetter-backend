'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define(
    'users',
    {
      UserId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: DataTypes.INTEGER(5)
      },
      FirstName: DataTypes.STRING(45),
      LastName: DataTypes.STRING(45),
      Email: {
        type: DataTypes.STRING(45),
        unique: true
      },
      Password: DataTypes.STRING(255),
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  users.associate = function(models) {
    users.hasMany(models.goals)

  };
  return users;
};