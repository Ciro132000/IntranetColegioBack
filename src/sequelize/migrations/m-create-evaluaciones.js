'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Evaluaciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      fechaInicio: {
        type: Sequelize.DATE
      },
      fechaFin: {
        type: Sequelize.DATE
      },
      notaMaxima: {
        type: Sequelize.INTEGER
      },
      idTipo: {
        type: Sequelize.INTEGER,
        references:{
          model: 'TipoEvaluacions',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('Evaluaciones');
  }
};