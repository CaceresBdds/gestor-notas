const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Nota = sequelize.define('Nota', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Nota;
