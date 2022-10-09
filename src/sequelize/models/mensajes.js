'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mensajes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Mensajes.hasMany(models.Usuarios, {
      //   foreignKey: 'idEnvia'
      // } )

      // Mensajes.hasMany(models.Usuarios, {
      //   foreignKey: 'idRecibe'
      // } )
    }
  }
  Mensajes.init({
    mensaje: DataTypes.STRING,
    idEnvia: DataTypes.INTEGER,
    idRecibe: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Mensajes',
  });
  return Mensajes;
};