'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let roles = [
      {
        rol:'Administrador',
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        rol:'Docente',
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        rol:'Alumno',
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      }
    ]

    return queryInterface.bulkInsert('Roles', roles, {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {})
  }
};
