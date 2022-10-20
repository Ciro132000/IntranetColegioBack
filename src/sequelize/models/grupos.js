'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grupos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Grupos.hasMany(models.Secciones, {
        foreignKey: 'idSeccion'
      } )
    }
  }
  Grupos.init({
    nombre: DataTypes.STRING,
    idSeccion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Grupos',
  });
  return Grupos;
};