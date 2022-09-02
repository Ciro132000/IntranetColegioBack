'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    let docentes = [
      {
        codigo:'D148691',
        nombre:'Pedro',
        apellido:'Castillo',
        dni:'88888888',
        correo:'D148691@abc.edu.pe',
        idNivel:1,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        codigo:'D148692',
        nombre:'Susana',
        apellido:'Diaz',
        dni:'88888888',
        correo:'D148692@abc.edu.pe',
        idNivel:2,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        codigo:'D148693',
        nombre:'Jesus',
        apellido:'Mendoza',
        dni:'88888888',
        idNivel:2,
        correo:'D148693@abc.edu.pe',
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      }
    ]

    return queryInterface.bulkInsert('Docentes', docentes, {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Docentes', null, {})
  }
};
