'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    let estudiantes = [
      {
        codigo:'E159871',
        nombre:'Nicolas',
        apellido:'Rosas',
        nivel:'Primaria',
        grado:2,
        dni:'88888888',
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        codigo:'E159872',
        nombre:'Estefany',
        apellido:'Diaz',
        nivel:'Secundaria',
        grado:2,
        dni:'88888888',
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        codigo:'E159873',
        nombre:'Sebastian',
        apellido:'Salazar',
        nivel:'Primaria',
        grado:5,
        dni:'88888888',
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        codigo:'E159874',
        nombre:'Rosa',
        apellido:'Castillo',
        nivel:'Secundaria',
        grado:4,
        dni:'88888888',
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        codigo:'E159875',
        nombre:'Juan',
        apellido:'Peña',
        nivel:'Primaria',
        grado:5,
        dni:'88888888',
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
