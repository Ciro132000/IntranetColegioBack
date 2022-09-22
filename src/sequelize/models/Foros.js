'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Foros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Foros.hasMany(models.Secciones, {
        foreignKey: 'idSeccion'
      })

      Foros.belongsTo(models.ForoRespuesta,{
        foreignKey:'id',
        target_key: 'idForo'
      })
    }
  }
  Foros.init({
    titulo: DataTypes.STRING,
    pregunta: DataTypes.STRING,
    fechaInicio: DataTypes.DATE,
    fechaFin: DataTypes.DATE,
    idSeccion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Foros',
  });
  return Foros;
};