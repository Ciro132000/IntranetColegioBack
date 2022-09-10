'use strict';

const { encrypt} = require('../../utils/handlePassword');

module.exports = {
  async up (queryInterface, Sequelize) {
    let passwordHash = await encrypt('123456789')
    let usuarios = [
      {
        usuario:'admin',
        contrasena:passwordHash ,
        idRol:1,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        usuario:'D148691@abc.edu.pe',
        contrasena:passwordHash ,
        idRol:2,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        usuario:'D148692@abc.edu.pe',
        contrasena:passwordHash ,
        idRol:2,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        usuario:'D148693@abc.edu.pe',
        contrasena:passwordHash ,
        idRol:2,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        usuario:'E159871',
        contrasena:passwordHash ,
        idRol:3,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        usuario:'E159872',
        contrasena:passwordHash ,
        idRol:3,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        usuario:'E159873',
        contrasena:passwordHash ,
        idRol:3,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        usuario:'E159874',
        contrasena:passwordHash ,
        idRol:3,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        usuario:'E159875',
        contrasena:passwordHash ,
        idRol:3,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
    ]

    return queryInterface.bulkInsert('Usuarios', usuarios, {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Usuarios', null, {})
  }
};
