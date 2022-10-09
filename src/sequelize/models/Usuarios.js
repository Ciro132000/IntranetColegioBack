'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Usuarios.belongsTo(models.Docentes,{
        foreignKey:'id',
        target_key: 'idUsuario'
      })

      Usuarios.belongsTo(models.Estudiantes,{
        foreignKey:'id',
        target_key: 'idUsuario'
      })

      Usuarios.belongsTo(models.Perfiles,{
        foreignKey:'id',
        target_key: 'idUsuario'
      })

      Usuarios.hasMany(models.Roles, {
        foreignKey: 'idRol'
      } )
    }
  }
  Usuarios.init({
    usuario: DataTypes.STRING,
    contrasena: DataTypes.STRING,
    idRol: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuarios',
  });
  return Usuarios;
};