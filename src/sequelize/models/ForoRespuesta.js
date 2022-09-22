'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ForoRespuesta extends Model {
    static associate(models) {

      ForoRespuesta.hasMany(models.Foros, {
        foreignKey: 'idForo'
      })

      ForoRespuesta.hasMany(models.Estudiantes, {
        foreignKey: 'idEstudiante'
      })
      

    }
  }
  ForoRespuesta.init({
    respuesta: DataTypes.STRING,
    idEstudiante: DataTypes.INTEGER,
    idForo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ForoRespuesta',
  });
  return ForoRespuesta;
};