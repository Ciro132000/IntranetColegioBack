'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Niveles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Niveles.belongsTo(models.Cursos,{
        foreignKey:'id',
        target_key: 'idNivel'
      })

      Niveles.belongsTo(models.Docentes,{
        foreignKey:'id',
        target_key: 'idNivel'
      })

      Niveles.belongsTo(models.Aulas,{
        foreignKey:'id',
        target_key: 'idNivel'
      })

    }
  }
  Niveles.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Niveles',
  });
  return Niveles;
};