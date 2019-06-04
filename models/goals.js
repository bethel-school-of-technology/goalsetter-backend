'use strict';
module.exports = (sequelize, DataTypes) => {
  const goals = sequelize.define('goals', {
    GoalId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Goal: DataTypes.STRING,
    DateFinished: DataTypes.DATE,
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