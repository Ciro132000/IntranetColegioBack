'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    let secciones = [
      {
        codigo:'S182061',
        idCurso:1,
        idDocente:1,
        idAula:1,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        codigo:'S182062',
        idCurso:2,
        idDocente:1,
        idAula:1,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        codigo:'S182063',
        idCurso:3,
        idDocente:2,
        idAula:1,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      }
    ]

    return queryInterface.bulkInsert('Secciones', secciones, {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Secciones', null, {})
  }
};
