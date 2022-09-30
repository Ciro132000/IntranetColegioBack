'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Modulos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Modulos.hasMany(models.Secciones, {
        foreignKey: 'idSeccion'
      })

      Modulos.belongsTo(models.Lecciones,{
        foreignKey:'id',
        target_key: 'idModulo'
      })
    }
  }
  Modulos.init({
    nombre: DataTypes.STRING,
    idSeccion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Modulos',
  });
  return Modulos;
};