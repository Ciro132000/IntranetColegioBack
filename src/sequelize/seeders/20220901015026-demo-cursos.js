'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    let cursos = [
      {
        nombre:'Matematicas',
        credito:2,
        horas:2,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        nombre:'Comunicación',
        credito:2,
        horas:2,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        nombre:'Ciencias Sociales',
        credito:2,
        horas:2,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        nombre:'Historia del Perú',
        credito:2,
        horas:2,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      }
    ]

    return queryInterface.bulkInsert('Cursos', cursos, {})
  },

  async down (queryInterface, Sequelize) {

    return queryInterface.bulkDelete('Cursos', null, {})

  }
};
