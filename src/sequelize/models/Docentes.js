'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Docentes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Docentes.belongsTo(models.Secciones,{
        foreignKey:'id',
        target_key: 'idDocente'
      })
    }
  }
  Docentes.init({
    codigo: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    dni: DataTypes.STRING,
    correo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Docentes',
  });
  return Docentes;
};