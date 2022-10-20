'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asistencias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Asistencias.hasMany(models.Secciones, {
        foreignKey: 'idSeccion'
      })
      Asistencias.hasMany(models.Estudiantes, {
        foreignKey: 'idEstudiante'
      })
    }
  }
  Asistencias.init({
    dia: DataTypes.DATEONLY,
    asistencia: DataTypes.BOOLEAN,
    idEstudiante: DataTypes.INTEGER,
    idSeccion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Asistencias',
  });
  return Asistencias;
};