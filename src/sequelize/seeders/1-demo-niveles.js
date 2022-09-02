'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let niveles = [
      {
        nombre: 'Primaria',
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        nombre: 'Secundaria',
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      
    ]

    return queryInterface.bulkInsert('Niveles', niveles, {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Niveles', null, {})
  }
};
