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

      Estudiantes.hasMany(models.Grupos, {
        foreignKey: 'idGrupo'
      } )

      Estudiantes.belongsTo(models.ForoRespuesta,{
        foreignKey:'id',
        target_key: 'idEstudiante'
      })

      Estudiantes.belongsTo(models.Actividades,{
        foreignKey:'id',
        target_key: 'idEstudiante'
      })

      Estudiantes.belongsTo(models.Asistencias,{
        foreignKey:'id',
        target_key: 'idEstudiante'
      })


      // evaluaciones

      Estudiantes.belongsTo(models.Notas,{
        foreignKey:'id',
        target_key: 'idEstudiante'
      })

      Estudiantes.belongsTo(models.RespuestasTarea,{
        foreignKey:'id',
        target_key: 'idEstudiante'
      })

      Estudiantes.belongsTo(models.RespuestasExamen,{
        foreignKey:'id',
        target_key: 'idEstudiante'
      })

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
    idUsuario:DataTypes.INTEGER,
    idGrupo:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Estudiantes',
  });
  return Estudiantes;
};