'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Horarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      horaInicio: {
        type: Sequelize.TIME
      },
      horaFinal: {
        type: Sequelize.TIME
      },
      dia: {
        type: Sequelize.INTEGER
      },
      idSeccion: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Secciones',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      idCurso: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Cursos',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      idAula: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Aulas',
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
    await queryInterface.dropTable('Horarios');
  }
};