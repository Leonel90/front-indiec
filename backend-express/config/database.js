const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('manager', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
