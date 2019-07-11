'use strict';


module.exports = (sequelize, DataTypes) => {
  const goals = sequelize.define('goals', {
    GoalId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.INTEGER(5)
    },
    
    Goal: DataTypes.STRING,
    DateFinished: DataTypes.DATE,
    Reminder: DataTypes.STRING,
    Notes: DataTypes.STRING
  }, 
  {}
  );

  
   // associations can be defined here
  // goals.associate = function(models) {
  //   goals.belongsTo(models.users, {
  //     foreignKey: 'UserId',
  //   })
   
  // };
  return goals;
};