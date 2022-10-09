'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Perfiles extends Model {

    static associate(models) {
      Perfiles.hasMany(models.Usuarios, {
        foreignKey: 'idUsuario'
      } )
    }
  }
  Perfiles.init({
    img: DataTypes.STRING,
    estado: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    idUsuario: DataTypes.INTEGER,
    isNotificacion: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Perfiles',
  });
  return Perfiles;
};