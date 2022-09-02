'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Secciones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Secciones.hasMany(models.Cursos, {
        foreignKey: 'idCurso'
      } )

      Secciones.hasMany(models.Docentes, {
        foreignKey: 'idDocente'
      })

      Secciones.belongsTo(models.Horario,{
        foreignKey:'id',
        target_key: 'idSeccion'
      })

    }
  }
  Secciones.init({
    codigo: DataTypes.STRING,
    dia: DataTypes.INTEGER,
    inicio: DataTypes.TIME,
    fin: DataTypes.TIME,
    idCurso: DataTypes.INTEGER,
    idDocente: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Secciones',
  });
  return Secciones;
};