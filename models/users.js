'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define(
    'users',
    {
      UserId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER(5)
      },
      FirstName: DataTypes.STRING(45),
      LastName: DataTypes.STRING(45),
      Email: {
        type: DataTypes.STRING(45),
        unique: true
      },
      Username: {
        type: DataTypes.STRING(45),
        unique: true
      },
      Password: DataTypes.STRING(45),
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );


  return users;
};