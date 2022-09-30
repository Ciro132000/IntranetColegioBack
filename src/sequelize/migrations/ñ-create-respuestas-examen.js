'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RespuestasExamens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      respuesta: {
        type: Sequelize.STRING
      },
      puntos: {
        type: Sequelize.INTEGER
      },
      idPregunta: {
        type: Sequelize.INTEGER,
        references:{
          model: 'PreguntasExamens',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      idEstudiante: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Estudiantes',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('RespuestasExamens');
  }
};