'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PreguntasExamen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PreguntasExamen.hasMany(models.Evaluaciones, {
        foreignKey: 'idEvaluacion'
      })

      PreguntasExamen.belongsTo(models.RespuestasExamen ,{
        foreignKey:'id',
        target_key: 'idPregunta'
      })
    }
  }
  PreguntasExamen.init({
    pregunta: DataTypes.STRING,
    punto: DataTypes.INTEGER,
    idEvaluacion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PreguntasExamen',
  });
  return PreguntasExamen;
};