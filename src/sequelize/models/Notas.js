'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notas extends Model {

    static associate(models) {
      // define association here
      Notas.hasMany(models.Estudiantes, {
        foreignKey: 'idEstudiante'
      })

      Notas.hasMany(models.Evaluaciones, {
        foreignKey: 'idEvaluacion'
      })
    }
  }
  Notas.init({
    nota: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN,
    idEstudiante: DataTypes.INTEGER,
    idEvaluacion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Notas',
  });
  return Notas;
};