'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let aulas = [
      {
        nombre: '1A',
        idNivel: 1,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        nombre: '2A',
        idNivel: 1,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        nombre: '3A',
        idNivel: 1,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        nombre: '4A',
        idNivel: 1,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        nombre: '5A',
        idNivel: 1,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        nombre: '6A',
        idNivel: 1,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        nombre: '1A',
        idNivel: 2,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        nombre: '2A',
        idNivel: 2,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        nombre: '3A',
        idNivel: 2,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        nombre: '4A',
        idNivel: 2,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        nombre: '5A',
        idNivel: 2,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      
    ]

    return queryInterface.bulkInsert('Aulas', aulas, {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Aulas', null, {})
  }
};
