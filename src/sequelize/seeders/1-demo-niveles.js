'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let niveles = [
      {
        nombre: 'Primaria'
      },
      {
        nombre: 'Secundaria'
      },
      
    ]

    return queryInterface.bulkInsert('Niveles', niveles, {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Niveles', null, {})
  }
};
