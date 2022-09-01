'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estudiantes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Estudiantes.init({
    codigo: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    nivel: DataTypes.STRING,
    grado: DataTypes.INTEGER,
    dni: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Estudiantes',
  });
  return Estudiantes;
};