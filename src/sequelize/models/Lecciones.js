'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lecciones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lecciones.hasMany(models.Modulos,{
          foreignKey: 'idModulo'
      })
    }
  }
  Lecciones.init({
    nombre: DataTypes.STRING,
    archivo: DataTypes.STRING,
    tipoArchivo: DataTypes.STRING,
    idModulo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lecciones',
  });
  return Lecciones;
};