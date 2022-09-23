'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RespuestasTarea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RespuestasTarea.hasMany(models.Estudiantes, {
        foreignKey: 'idEstudiante'
      })

      RespuestasTarea.hasMany(models.Evaluaciones, {
        foreignKey: 'idEvaluacion'
      })
    }
  }
  RespuestasTarea.init({
    respuesta: DataTypes.STRING,
    archivo: DataTypes.STRING,
    tipoArchivo: DataTypes.STRING,
    idEvaluacion: DataTypes.INTEGER,
    idEstudiante: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RespuestasTarea',
  });
  return RespuestasTarea;
};