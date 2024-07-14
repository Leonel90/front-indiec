const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('musica_indiec', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
