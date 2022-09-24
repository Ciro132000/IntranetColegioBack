'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoEvaluacion extends Model {
    
    static associate(models) {
      // define association here
      TipoEvaluacion.belongsTo(models.Evaluaciones,{
        foreignKey:'id',
        target_key: 'idTipo'
      })

    }

  }
  TipoEvaluacion.init({
    tipo: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TipoEvaluacion',
  });
  return TipoEvaluacion;
};