'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notificaciones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notificaciones.hasMany(models.Aulas, {
        foreignKey: 'idAula'
      })

      Notificaciones.hasMany(models.Docentes, {
        foreignKey: 'idDocente'
      })
    }
  }
  Notificaciones.init({
    tipoNotificación: DataTypes.STRING,
    mensaje: DataTypes.STRING,
    idAula: DataTypes.INTEGER,
    idDocente: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Notificaciones',
  });
  return Notificaciones;
};