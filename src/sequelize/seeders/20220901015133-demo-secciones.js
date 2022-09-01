'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    let secciones = [
      {
        codigo:'S182061',
        dia:1,
        inicio:'08:00:00',
        fin:'09:30:00',
        idCurso:1,
        idDocente:1
      },
      {
        codigo:'S182062',
        dia:2,
        inicio:'08:00:00',
        fin:'09:30:00',
        idCurso:1,
        idDocente:1
      },
      {
        codigo:'S182063',
        dia:3,
        inicio:'08:00:00',
        fin:'09:30:00',
        idCurso:1,
        idDocente:1
      }
    ]

    return queryInterface.bulkInsert('Secciones', secciones, {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Secciones', null, {})
  }
};
