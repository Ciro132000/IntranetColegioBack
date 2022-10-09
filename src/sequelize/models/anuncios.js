'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anuncios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Anuncios.hasMany(models.Secciones, {
        foreignKey: 'idSeccion'
      })
    }
  }
  Anuncios.init({
    asunto: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    idSeccion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Anuncios',
  });
  return Anuncios;
};