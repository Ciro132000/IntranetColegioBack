'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cursos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cursos.belongsTo(models.Secciones,{
        foreignKey:'id',
        target_key: 'idCurso'
      })

      Cursos.belongsTo(models.Horario,{
        foreignKey:'id',
        target_key: 'idCurso'
      })

      Cursos.hasMany(models.Niveles, {
        foreignKey: 'idNivel'
      } )

    }
  }
  Cursos.init({
    nombre: DataTypes.STRING,
    credito: DataTypes.INTEGER,
    horas: DataTypes.INTEGER,
    idNivel:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Cursos',
  });
  return Cursos;
};