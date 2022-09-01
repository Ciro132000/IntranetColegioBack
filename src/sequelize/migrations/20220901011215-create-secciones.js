'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Secciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigo: {
        type: Sequelize.STRING
      },
      dia: {
        type: Sequelize.INTEGER
      },
      inicio: {
        type: Sequelize.TIME
      },
      fin: {
        type: Sequelize.TIME
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
      idDocente: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Docentes',
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
    await queryInterface.dropTable('Secciones');
  }
};