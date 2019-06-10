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
    Reminder: DataTypes.STRING,
    Notes: DataTypes.STRING
  }, 
  {}
  );
  goals.associate = function(models) {
    goals.belongsTo(models.users, {
      foreignKey: 'UserId',
    })
    // associations can be defined here
  };
  return goals;
};