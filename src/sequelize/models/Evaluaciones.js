'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evaluaciones extends Model {

    static associate(models) {
      // define association here
      Evaluaciones.hasMany(models.TipoEvaluacion, {
        foreignKey: 'idTipo'
      })

      Evaluaciones.hasMany(models.Secciones, {
        foreignKey: 'idSeccion'
      })

      Evaluaciones.belongsTo(models.PreguntasExamen ,{
        foreignKey:'id',
        target_key: 'idEvaluacion'
      })

      Evaluaciones.belongsTo(models.RespuestasExamen ,{
        foreignKey:'id',
        target_key: 'idEvaluacion'
      })

      Evaluaciones.belongsTo(models.RespuestasTarea ,{
        foreignKey:'id',
        target_key: 'idEvaluacion'
      })
    }
  }
  Evaluaciones.init({
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    fechaInicio: DataTypes.DATE,
    fechaFin: DataTypes.DATE,
    notaMaxima: DataTypes.INTEGER,
    idTipo: DataTypes.INTEGER,
    idSeccion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Evaluaciones',
  });
  return Evaluaciones;
};