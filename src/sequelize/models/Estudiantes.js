'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estudiantes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Estudiantes.hasMany(models.Niveles, {
        foreignKey: 'idNivel'
      } )

      Estudiantes.hasMany(models.Niveles, {
        foreignKey: 'idNivel'
      } )
      
      Estudiantes.hasMany(models.Usuarios, {
        foreignKey: 'idUsuario'
      } )
    }
  }
  Estudiantes.init({
    codigo: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    grado: DataTypes.INTEGER,
    dni: DataTypes.STRING,
    idNivel: DataTypes.INTEGER,
    idAula: DataTypes.INTEGER,
    idUsuario:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Estudiantes',
  });
  return Estudiantes;
};