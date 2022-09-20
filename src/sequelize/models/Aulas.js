'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aulas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Aulas.belongsTo(models.Horario,{
        foreignKey:'id',
        target_key: 'idAula'
      })

      Aulas.belongsTo(models.Estudiantes,{
        foreignKey:'id',
        target_key: 'idAula'
      })

      Aulas.belongsTo(models.Secciones,{
        foreignKey:'id',
        target_key: 'idAula'
      })

      Aulas.hasMany(models.Niveles, {
        foreignKey: 'idNivel'
      })

    }
  }
  Aulas.init({
    grado: DataTypes.INTEGER,
    seccion: DataTypes.STRING,
    idNivel: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Aulas',
  });
  return Aulas;
};