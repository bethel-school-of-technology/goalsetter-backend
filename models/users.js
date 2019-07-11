'use strict';

module.exports = (sequelize, DataTypes) => {
  // var seq = require("sequelize")
  var users = sequelize.define(
    'users',
    {
      Id: {
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


  return users;
};