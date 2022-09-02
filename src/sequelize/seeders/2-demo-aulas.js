'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let aulas = [
      {
        nombre: '1A',
        idNivel: 1
      },
      {
        nombre: '2A',
        idNivel: 1
      },
      {
        nombre: '3A',
        idNivel: 1
      },
      {
        nombre: '4A',
        idNivel: 1
      },
      {
        nombre: '5A',
        idNivel: 1
      },
      {
        nombre: '6A',
        idNivel: 1
      },
      {
        nombre: '1A',
        idNivel: 2
      },
      {
        nombre: '2A',
        idNivel: 2
      },
      {
        nombre: '3A',
        idNivel: 2
      },
      {
        nombre: '4A',
        idNivel: 2
      },
      {
        nombre: '5A',
        idNivel: 2
      },
      
    ]

    return queryInterface.bulkInsert('Aulas', aulas, {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Aulas', null, {})
  }
};
