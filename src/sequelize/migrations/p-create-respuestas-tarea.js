'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RespuestasTareas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      respuesta: {
        type: Sequelize.STRING
      },
      archivo: {
        type: Sequelize.STRING
      },
      tipoArchivo: {
        type: Sequelize.STRING
      },
      idEvaluacion: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Evaluaciones',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      idEstudiante: {
        type: Sequelize.INTEGER,
        type: Sequelize.INTEGER,
        references:{
          model: 'Estudiantes',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RespuestasTareas');
  }
};