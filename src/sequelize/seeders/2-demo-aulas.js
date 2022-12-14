'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let aulas = [
      {
        grado:1,
        seccion:'A',
        idNivel: 1,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        grado:2,
        seccion:'A',
        idNivel: 1,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        grado:3,
        seccion:'A',
        idNivel: 1,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        grado:4,
        seccion:'A',
        idNivel: 1,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        grado:5,
        seccion:'A',
        idNivel: 1,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        grado:6,
        seccion:'A',
        idNivel: 1,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        grado:1,
        seccion:'A',
        idNivel: 2,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        grado:2,
        seccion:'A',
        idNivel: 2,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        grado:3,
        seccion:'A',
        idNivel: 2,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        grado:4,
        seccion:'A',
        idNivel: 2,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        grado:5,
        seccion:'A',
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
