'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    let estudiantes = [
      {
        codigo:'E159871',
        nombre:'Nicolas',
        apellido:'Rosas',
        grado:2,
        dni:'88888888',
        idNivel:1,
        idAula:1,
        idUsuario:5,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        codigo:'E159872',
        nombre:'Estefany',
        apellido:'Diaz',
        grado:2,
        dni:'88888888',
        idNivel:2,
        idAula:1,
        idUsuario:6,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        codigo:'E159873',
        nombre:'Sebastian',
        apellido:'Salazar',
        grado:5,
        dni:'88888888',
        idNivel:1,
        idAula:1,
        idUsuario:7,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        codigo:'E159874',
        nombre:'Rosa',
        apellido:'Castillo',
        grado:4,
        dni:'88888888',
        idNivel:1,
        idAula:1,
        idUsuario:8,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        codigo:'E159875',
        nombre:'Juan',
        apellido:'Peña',
        grado:5,
        dni:'88888888',
        idNivel:1,
        idAula:1,
        idUsuario:9,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      }
    ]

    return queryInterface.bulkInsert('Estudiantes', estudiantes, {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Estudiantes', null, {})
  }
};
