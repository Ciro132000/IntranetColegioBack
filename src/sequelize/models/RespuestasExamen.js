'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RespuestasExamen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RespuestasExamen.hasMany(models.PreguntasExamen, {
        foreignKey: 'idPregunta'
      })

      RespuestasExamen.hasMany(models.Estudiantes, {
        foreignKey: 'idEstudiante'
      })
    }
  }
  RespuestasExamen.init({
    respuesta: DataTypes.STRING,
    puntos: DataTypes.INTEGER,
    idPregunta: DataTypes.INTEGER,
    idEstudiante: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RespuestasExamen',
  });
  return RespuestasExamen;
};