'use strict';
module.exports = (sequelize, DataTypes) => {
  const goals = sequelize.define('goals', {
    GoalId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(5)
    },
    UserId: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: false,
      type: DataTypes.INTEGER(5)
    },
    Goal: DataTypes.STRING,
    DateFinished: DataTypes.DATE,
    CategoryId: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: false,
      type: DataTypes.INTEGER(5)
    },
    Category: DataTypes.STRING,
    Reminder: DataTypes.STRING,
    Notes: DataTypes.STRING
  }, 
  {}
  );
  goals.associate = function(models) {
    // associations can be defined here
  };
  return goals;
};