'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Horario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Horario.hasMany(models.Secciones, {
        foreignKey: 'idSeccion'
      } )

      Horario.hasMany(models.Cursos, {
        foreignKey: 'idCurso'
      } )

      Horario.hasMany(models.Aulas, {
        foreignKey: 'idAula'
      } )

    }
  }
  Horario.init({
    horaInicio: DataTypes.TIME,
    horaFinal: DataTypes.TIME,
    dia: DataTypes.INTEGER,
    idSeccion: DataTypes.INTEGER,
    idCurso: DataTypes.INTEGER,
    idAula: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Horario',
  });
  return Horario;
};