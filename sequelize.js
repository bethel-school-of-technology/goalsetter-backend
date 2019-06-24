import Sequelize from 'sequelize';
import UserModel from './models/user';

const sequelize = new Sequelize('<table name>', '<db username>', '<db password>', {
  host: '<host - could be localhost or service name for docker-compose service>',
  dialect: 'mysql <or whichever SQL dialect you choose>',
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync().then(() => {
  console.log(`Database and table have been created`);
});

module.exports = User;