const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artista = sequelize.define('artista', {
  foto_perfil: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  celular1: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

});

module.exports = Artista;
