'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actividades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Actividades.hasMany(models.Estudiantes, {
        foreignKey: 'idSeccion'
      } )
    }
  }
  Actividades.init({
    actividad: DataTypes.STRING,
    nombreActividad: DataTypes.STRING,
    idEstudiante: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Actividades',
  });
  return Actividades;
};